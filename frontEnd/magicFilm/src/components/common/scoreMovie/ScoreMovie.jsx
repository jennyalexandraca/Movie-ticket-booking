import React from "react";
import StarIcon from "@mui/icons-material/Star";
const ScoreMovie = ({ value }) => {
  console.log("🚀 ~ file: ScoreMovie.jsx:4 ~ ScoreMovie ~ value:", value);
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}
    >
      <h3>Calificación:</h3>

      <StarIcon fontSize="string" sx={{ color: "#ffd700", fontSize: "30px" }} />
      <h2
        variant="h3"
        color="initial"
        sx={{ fontSize: "30px", margin: "auto 10px" }}
      >
        {value}
      </h2>
    </div>
  );
};

export default ScoreMovie;
