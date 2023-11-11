import React, { useEffect, useState } from "react";
import RatingMovie from "./RatingMovie";
import { createScore, getScores } from "../../../service/rating";
import Swal from "sweetalert2";

const RatingMovieContainer = (props) => {
  const { dataMovie } = props
  console.log(dataMovie.id);
  const [value, setValue] = useState(2);
  const [valueCalification, setValueCalification] = useState(true);
  
  console.log(value);

  const ratingData =
  {
    score: value,
    movie_id: dataMovie.id,
    user_id: 2
  }

  return (
    <RatingMovie 
    value={value}
    setValue={setValue} 
    />

  );
};

export default RatingMovieContainer;
