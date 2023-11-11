package com.backend.cinema.services;

import com.backend.cinema.dto.MovieDTO;
import com.backend.cinema.exception.ResourceNotFoundException;

import java.util.Set;

public interface IMovieService{   
   MovieDTO getId(Long id) throws ResourceNotFoundException;
   Set<MovieDTO> getAll() throws ResourceNotFoundException;
   MovieDTO save(MovieDTO movieDTO);
   void delete(Long id);
   void update(MovieDTO movieDTO);
   Set<MovieDTO> getByCategoryId(Long category_id);
   Set<MovieDTO> search(String search_input);

}


