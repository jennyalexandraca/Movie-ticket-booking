package com.backend.cinema.repository;

import com.backend.cinema.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Long> {
    Role getById(Long id);

}
