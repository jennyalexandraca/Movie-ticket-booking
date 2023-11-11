package com.backend.cinema.dto;

import com.backend.cinema.entity.Movie;
import com.backend.cinema.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ScoreDTO {

    private Long id;

    private String score;
    private User user;
    private Movie movie;
}
