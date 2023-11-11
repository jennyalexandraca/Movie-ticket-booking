package com.backend.cinema.dto;

import com.backend.cinema.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {
    
    private Long id;
    private Boolean is_verified;
    private String name;
    private String surname;
    private String email;
    private String password;
    private Date register_date;
    private Role role;
}
