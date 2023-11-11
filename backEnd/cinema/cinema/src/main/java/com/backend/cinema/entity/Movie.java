package com.backend.cinema.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "movie")
@Setter
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDate release_date;

    @Lob
    @Column(columnDefinition = "text")
    private String summary;

    private LocalDate finish_date;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<TrailerImages> trailer_images = new ArrayList<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Score> scores = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;


    private String gender;

    private String image;

    private Boolean state;

    private String trailer;

    private double avg_score;

    public void setTrailer_images(List<TrailerImages> trailerImages) {
        this.trailer_images = trailerImages;
        for (TrailerImages trailerImage: trailerImages ) {
            trailerImage.setMovie(this);
        }
    }

    public double getAvg_score() {
        double avg = 0.0;
        if (this.scores != null && !this.scores.isEmpty()) {
            int sum = this.scores.stream()
                    .mapToInt(Score::getScore)
                    .sum();
            avg = (double) sum / this.scores.size();
        }
        this.avg_score=avg;
        return avg;

    }
    public void setScores(List<Score> scores) {
        this.scores = scores;

        int sum = 0;
        for (Score score : scores) {
            score.setMovie(this);
            sum += score.getScore();
        }
        if (!scores.isEmpty()) {
            this.avg_score = (double) sum / scores.size();
        } else {
            this.avg_score = 0.0;
        }
    }

}
