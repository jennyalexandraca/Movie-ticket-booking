package com.backend.cinema.repository;

import com.backend.cinema.entity.Category;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@ComponentScan
public interface ICategoryRepository extends JpaRepository<Category, Long> {

}
