package com.backend.cinema.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.cinema.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long>{
    Optional<User> findOneByEmail(String email);

    
    Optional<User> findByEmailAndPassword(String email, String password);
    
}
