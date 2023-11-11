import React from "react";

import "./qualificationMovie.css";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from '@mui/material';

const QualificationMovie = () => {
  return (
    <div className="container-qualification">
      <h2>Calificacion</h2>

      <div className="container-qualification-images">
      <IconButton>
      <StarIcon color="secondary" fontSize="large" style={{ color: "#00C9C8" }}/>
      </IconButton>

      <IconButton>
      <StarIcon color="secondary" fontSize="large" style={{ color: "#00C9C8" }}/>
      </IconButton>
      
      <IconButton>
      <StarIcon color="secondary" fontSize="large" style={{ color: "#00C9C8" }}/>
      </IconButton>

      <IconButton>
      <StarIcon color="secondary" fontSize="large" style={{ color: "#00C9C8" }}/>
      </IconButton>

      <IconButton>
      <StarIcon color="secondary" fontSize="large" style={{ color: "#00C9C8" }}/>
      </IconButton>
      
        

      </div>
    </div>
  );
};

export default QualificationMovie;
