package com.backend.cinema.services.impl;

import com.backend.cinema.dto.MovieDTO;
import com.backend.cinema.entity.Movie;
import com.backend.cinema.exception.ResourceNotFoundException;
import com.backend.cinema.repository.IMovieRepository;
import com.backend.cinema.services.IMovieService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements IMovieService{
    
    public static final Logger log = LogManager.getLogger(MovieServiceImpl.class);
    
    private IMovieRepository movieRepository;

    @Autowired
    public MovieServiceImpl(IMovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    @Autowired
    ObjectMapper mapper;

    public MovieDTO getId(Long id){
//        Optional<Movie> movieOptional = movieRepository.findById(id);
//        Movie movie = movieOptional.orElse(null);
//        return mapper.convertValue(movie, MovieDTO.class);
        Optional<Movie> movieOptional = movieRepository.findById(id);
        Movie movie = movieOptional.orElse(null);
        return mapper.convertValue(movie, MovieDTO.class);
    }

    @Override
    public Set<MovieDTO> getByCategoryId(Long category_id){
        Set<MovieDTO> movieDto = new HashSet<>();
        Set<Movie> moviesByCategory= movieRepository.getByCategoryId(category_id);
        if (moviesByCategory.isEmpty()) {
            return movieDto;
        }
        for(Movie movie : moviesByCategory){
            movieDto.add(mapper.convertValue(movie, MovieDTO.class));
        }
        log.info("Movies were found by category");
        return movieDto.stream()
                .sorted(Comparator.comparing(MovieDTO::getId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public Set<MovieDTO> getAll() throws ResourceNotFoundException{
        if(movieRepository.findAll().isEmpty()) {
            log.warn("No Movies Founded");
            throw new ResourceNotFoundException("No se encontraron peliculas");
        }
        List<Movie> movies = movieRepository.findAll();
        Set<MovieDTO> movieDto = new HashSet<>();
        for(Movie movie : movies){
            movieDto.add(mapper.convertValue(movie, MovieDTO.class));
        }
        return movieDto.stream()
               .sorted(Comparator.comparing(MovieDTO::getId))
               .collect(Collectors.toCollection(LinkedHashSet::new));
    }   

    public MovieDTO save(MovieDTO movieDTO){
        Movie movie = mapper.convertValue(movieDTO, Movie.class);
        Movie saveMovie = movieRepository.save(movie);
        log.info("Movie saved successfully: {}",movieDTO);
        return mapper.convertValue(saveMovie, MovieDTO.class);
    }
    public Set<MovieDTO> search(String search_input) {
        Set<Movie> movies = movieRepository.search(search_input);
        if (movies.isEmpty()) {
            log.info("No movies found for search query: {}", search_input);
            return Collections.emptySet();
        }
        Set<MovieDTO> movieDto = new HashSet<>();
        for(Movie movie : movies){
            movieDto.add(mapper.convertValue(movie, MovieDTO.class));
        }
        return movieDto.stream()
                .sorted(Comparator.comparing(MovieDTO::getId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    public void delete(Long id){
        movieRepository.deleteById(id);
        log.info("Movie deleted successfully with ID: {}",id);
    }

    public void update(MovieDTO movieDTO){
        save(movieDTO);
        log.info("Movie updated correctly: {}",movieDTO.getTitle());
    }

    public boolean existsById(Long id) {
        return movieRepository.existsById(id);
    }
}
