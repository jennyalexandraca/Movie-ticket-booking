package com.backend.cinema.controllers;

import com.backend.cinema.dto.MovieDTO;
import com.backend.cinema.exception.ResourceNotFoundException;
import com.backend.cinema.services.impl.MovieServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/movie")
@CrossOrigin(origins = "*")
public class MovieController{
    public static final Logger log = LogManager.getLogger(MovieServiceImpl.class);
    private MovieServiceImpl movieService;

    @Autowired
    public MovieController(MovieServiceImpl movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getId(@PathVariable Long id) throws ResourceNotFoundException {
        MovieDTO movie = movieService.getId(id);
        if (movie == null) {
            log.error("Movie not found with ID: {}", id);
            throw new ResourceNotFoundException("Error retrieving movie.");
        }
        log.info("Movie successfully retrieved with ID: {}", id);
        return ResponseEntity.ok().body(movie);
    }

    @GetMapping("/category/{category_id}")
    public ResponseEntity<Set<MovieDTO>> getMoviesByCategoryId(@PathVariable Long category_id) throws ResourceNotFoundException {
        Set<MovieDTO> movies = movieService.getByCategoryId(category_id);
        log.info("Movies found: {}", movies);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<Set<MovieDTO>> getMovies() throws ResourceNotFoundException {
        Set<MovieDTO> movies = movieService.getAll();
        log.info("Movies found: {}", movies);
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<MovieDTO> save(@RequestBody MovieDTO movieDTO) {
        log.info("Creating movie:", movieDTO);
        MovieDTO response = movieService.save(movieDTO);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            if (!movieService.existsById(id)) {
                log.warn("Movie not found with ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            movieService.delete(id);
            log.info("Movie deleted with ID: {}", id);
            return ResponseEntity.status(HttpStatus.OK).build();
       } catch (IllegalArgumentException e) {
            log.warn("Invalid ID: {}", id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping
    public ResponseEntity<MovieDTO> update(@PathVariable Long id, @RequestBody MovieDTO movieDTO){
        MovieDTO movie = movieService.save(movieDTO);
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Set<MovieDTO>> searchMovies(@RequestParam("search_input") String searchInput) {
        Set<MovieDTO> movies = movieService.search(searchInput);
        return ResponseEntity.ok().body(movies);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public String ProcessResourceNotFoundException(ResourceNotFoundException resourceNotFoundException) {
        return resourceNotFoundException.getMessage();
    }
}
