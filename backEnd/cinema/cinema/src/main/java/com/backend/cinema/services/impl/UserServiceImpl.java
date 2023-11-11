	package com.backend.cinema.services.impl;

	import com.backend.cinema.dto.UserCreateDTO;
	import com.backend.cinema.dto.UserDTO;
	import com.backend.cinema.dto.UserResponseDTO;
	import com.backend.cinema.entity.Role;
	import com.backend.cinema.entity.User;
	import com.backend.cinema.exception.ResourceNotFoundException;
	import com.backend.cinema.repository.IRoleRepository;
	import com.backend.cinema.repository.IUserRepository;
	import com.backend.cinema.security.TokenUtils;
	import com.backend.cinema.services.IUserService;
	import com.backend.cinema.utilities.EmailService;
	import com.fasterxml.jackson.databind.ObjectMapper;
	import io.jsonwebtoken.Claims;
	import jakarta.persistence.EntityNotFoundException;
	import jakarta.transaction.Transactional;
	import org.apache.logging.log4j.LogManager;
	import org.apache.logging.log4j.Logger;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.dao.DataIntegrityViolationException;
	import org.springframework.security.crypto.password.PasswordEncoder;
	import org.springframework.stereotype.Service;

	import java.util.*;
	import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {

	public static final Logger log = LogManager.getLogger(MovieServiceImpl.class);

	private final IUserRepository userRepository;
	private final IRoleRepository roleRepository;

	private final PasswordEncoder passwordEncoder;

	private final EmailService emailService;


	@Autowired
	public UserServiceImpl(IUserRepository userRepository, PasswordEncoder passwordEncoder,IRoleRepository roleRepository,EmailService emailService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.roleRepository= roleRepository;
		this.emailService = emailService;

	}

	@Autowired
	ObjectMapper mapper;

	@Override
	public UserResponseDTO getId(Long id) {
		Optional<User> userOptional = userRepository.findById(id);
		User user = userOptional.orElse(null);
		if (user == null) {
			log.error("User not found with ID: {}", id);
			throw new ResourceNotFoundException("Error retrieving user.");
		}
		log.info("User successfully retrieved with ID: {}", id);
		return mapper.convertValue(user, UserResponseDTO.class);
	}

	public Set<UserResponseDTO> getAll() throws ResourceNotFoundException {
		if (userRepository.findAll().isEmpty()) {
			log.info("No users found");
			throw new ResourceNotFoundException("No users found");
		} else {
			Set<UserResponseDTO> userDto = new HashSet<>();
			List<User> users = userRepository.findAll();
			for (User user : users) {
				userDto.add(mapper.convertValue(user, UserResponseDTO.class));
			}
			log.info("Users were found");
			return userDto.stream()
					.sorted(Comparator.comparing(UserResponseDTO::getId))
					.collect(Collectors.toCollection(LinkedHashSet::new));
		}
	}

	public void save(UserCreateDTO userDTO) {
		try {
			if (userDTO == null || userDTO.getEmail() == null || userDTO.getEmail().isEmpty()
					|| userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
				throw new IllegalArgumentException("Email and password are required");
			}

			User user = mapper.convertValue(userDTO, User.class);
			Role userRole = roleRepository.getReferenceById(2L);
			user.setRole(userRole);
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setIsVerified(false);
			user.setRegisterDate(new Date());
			User userMovie = userRepository.save(user);
			String token= TokenUtils.createVerifyToken(userDTO.getEmail());
			System.out.println("token = " + token);
			String url = "http://localhost:5173/verify?email="+userDTO.getEmail() + "&token=" + token;
			emailService.sendRegisterEmail(userDTO.getName(), url, userDTO.getEmail(), "Verificacíon del Correo");
			log.info("User saved successfully: {}", userDTO);
			/*return mapper.convertValue(userMovie, UserResponseDTO.class);*/
		} catch (DataIntegrityViolationException ex) {
			String errorMessage = "An error ocurred while saving the user";
			System.out.println("Exception message: " + ex.getMessage());
		
			if(ex.getMessage().contains("Duplicate entry")){
				errorMessage = "The mail is alredy registered";
			}

				throw new IllegalArgumentException(errorMessage);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	@Transactional
	public void delete(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
		userRepository.deleteById(id);
		log.info("User deleted successfully with ID: {}", id);
	}

	public void resendEmail(String email) throws Exception {
		Optional<User> userFind= userRepository.findOneByEmail(email);
		if (userFind.isPresent()){
			try {
				User user= userFind.get();
				String token= TokenUtils.createVerifyToken(user.getEmail());
				String url = "http://localhost:5173/verify?email="+user.getEmail() + "&token=" + token;
				emailService.sendRegisterEmail(user.getName(), url, user.getEmail(), "Verificacíon del Correo");
			}catch (Exception e){
				throw new Exception("Hubo un problema al enviarl el correo :" + e.getMessage());
			}

		}
	}

//	@Override
//	public void update(UserDTO userDTO) {
//		save(userDTO);
//		log.info("User updated correctly: {}", userDTO.getEmail());
//	}

	public boolean existsById(Long id) {
		return userRepository.existsById(id);
	}

	public User login(String email, String password) {
		Optional<User> userOptional = userRepository.findByEmailAndPassword(email, password);
		if (userOptional.isPresent()) {
			log.info("successfully logged in");
			return userOptional.get();
		} else {
			throw new IllegalArgumentException("Credenciales inválidas");
		}
	}

	public HashMap<String, Object> verifyEmail(String token) {
		try{
			Claims data = TokenUtils.decodeToken(token);
			if (data != null) {
				String email = data.getSubject();
				Optional<User> userFilter = userRepository.findOneByEmail(email);
				HashMap<String, Object> verifiedData = new HashMap<>();

				Date now = new Date();

				if (userFilter.isPresent()) {
					verifiedData.put("email", email);
					User user = userFilter.get();
					long diffInMillis = now.getTime() - user.getRegisterDate().getTime();
					long diffInHours = diffInMillis / (60 * 60 * 1000);
					if (diffInHours<48 && user.getIsVerified().equals(Boolean.FALSE)) {
						user.setIsVerified(Boolean.TRUE);
						user = userRepository.save(user);
					}


					verifiedData.put("is_verified",user.getIsVerified());
					verifiedData.put("register_date", user.getRegisterDate());

				}
				return verifiedData;
			}
		} catch(Exception e) {
			throw new IllegalArgumentException("Token inválido o expirado: "+ e.getMessage());
		}
		return null;
	}


	public UserDTO getUserFromToken(String token) {
		try {
			Claims data = TokenUtils.decodeToken(token);
			if (data != null) {
				String email = data.getSubject();
				Optional<User> userFilter = userRepository.findOneByEmail(email);
				if (userFilter.isPresent()) {
					User user = userFilter.get();
					return mapper.convertValue(user, UserDTO.class);
				}
				return null;
			}
		}catch (Exception e){
			throw new IllegalArgumentException("Token inválido o expirado: "+ e.getMessage());
		}
		return null;
	}
}
