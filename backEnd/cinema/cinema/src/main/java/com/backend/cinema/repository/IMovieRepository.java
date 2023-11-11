package com.backend.cinema.repository;

import com.backend.cinema.entity.Movie;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@ComponentScan
public interface IMovieRepository extends JpaRepository<Movie,Long>{    
    Movie getById(Long id);

    @Query("from Movie m where m.category.id =?1")
    Set<Movie> getByCategoryId( Long category_id);
    @Query("SELECT m FROM Movie m WHERE m.title ILIKE %:searchInput%")
    Set<Movie> search(@Param("searchInput") String searchInput);
}
