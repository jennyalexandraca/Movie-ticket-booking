package com.backend.cinema.services;

import com.backend.cinema.dto.CategoryDTO;
import com.backend.cinema.exception.ResourceNotFoundException;

import java.util.Set;

public interface ICategoryService {
    Set<CategoryDTO> getAll() throws ResourceNotFoundException;

    CategoryDTO save(CategoryDTO categoryDTO);

}
