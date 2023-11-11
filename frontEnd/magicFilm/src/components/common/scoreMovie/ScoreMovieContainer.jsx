import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ScoreMovie from "./ScoreMovie";
import { getScores } from "../../../service/rating";
import { number } from "yup";

const ScoreMovieContainer = (props) => {
  const { dataMovie } = props;
  // const [score, setScore] = useState([]);
  // const [promScore, setPromScore] = useState([]);

  // const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const score = getScores();
  //   score
  //     .then((res) => setScore(res.data))
  //     .catch((error) => console.log(error));
  // }, []);
  // const numero = Number(user?.id);

  // useEffect(() => {
  //   const scoreById = score?.filter((item) => item?.user_id === numero);
  //   console.log(scoreById);
  //   setPromScore();
  // }, [score]);

  return (
    <div>
      <ScoreMovie value={dataMovie?.avg_score || 0} />
    </div>
  );
};

export default ScoreMovieContainer;
