package com.backend.cinema.services;

import com.backend.cinema.dto.UserCreateDTO;
import com.backend.cinema.dto.UserResponseDTO;
import com.backend.cinema.exception.ResourceNotFoundException;

import java.util.HashMap;
import java.util.Set;

public interface IUserService {
    UserResponseDTO getId(Long id) throws ResourceNotFoundException;
    Set<UserResponseDTO> getAll() throws ResourceNotFoundException;
    void save(UserCreateDTO userCreateDTO);
    void delete(Long id);
//    void update(UserDTO userDTO);
    HashMap<String,Object> verifyEmail(String Token);
}
