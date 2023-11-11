package com.backend.cinema.services.impl;

import com.backend.cinema.dto.CategoryDTO;
import com.backend.cinema.entity.Category;
import com.backend.cinema.exception.ResourceNotFoundException;
import com.backend.cinema.repository.ICategoryRepository;
import com.backend.cinema.services.ICategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements ICategoryService {
    private final ICategoryRepository categoryRepository;
    public static final Logger log = LogManager.getLogger(CategoryServiceImpl.class);
    @Autowired
    public CategoryServiceImpl(ICategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Autowired
    ObjectMapper mapper;


    public CategoryDTO save(CategoryDTO categoryDTO){
        Category category = mapper.convertValue(categoryDTO, Category.class);
        Category saveCategory = categoryRepository.save(category);
        log.info("Movie saved successfully: {}",categoryDTO);
        return mapper.convertValue(saveCategory, CategoryDTO.class);
    }

    @Override
    public Set<CategoryDTO> getAll() throws ResourceNotFoundException{
        if(categoryRepository.findAll().isEmpty())
            throw new ResourceNotFoundException("No se encontraron Categorias");
        List<Category> categories = categoryRepository.findAll();
        Set<CategoryDTO> categoryDto = new HashSet<>();
        for(Category category : categories){
            categoryDto.add(mapper.convertValue(category, CategoryDTO.class));
        }
        log.info("Categories were found");
        return categoryDto.stream()
                .sorted(Comparator.comparing(CategoryDTO::getId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }
}
