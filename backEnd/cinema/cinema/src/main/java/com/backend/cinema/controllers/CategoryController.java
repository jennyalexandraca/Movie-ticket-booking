package com.backend.cinema.controllers;

import com.backend.cinema.dto.CategoryDTO;
import com.backend.cinema.dto.UserDTO;
import com.backend.cinema.exception.ResourceNotFoundException;
import com.backend.cinema.services.impl.CategoryServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class CategoryController{
    public static final Logger log = LogManager.getLogger(CategoryServiceImpl.class);
    private final CategoryServiceImpl categoryService;

    @Autowired
    public CategoryController(CategoryServiceImpl categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public ResponseEntity<Set<CategoryDTO>> getCategories() throws ResourceNotFoundException {
        Set<CategoryDTO> categories = categoryService.getAll();
        if (categories.isEmpty()) {
            log.warn("No categories found");
            throw new ResourceNotFoundException("No category found");
        }
        log.info("categories found: {}", categories);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<CategoryDTO> save(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO response = categoryService.save(categoryDTO);
        return ResponseEntity.ok().body(response);
    }



}
