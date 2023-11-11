import React, { useEffect, useState, Suspense } from "react";
import RecommendedMovies from "./RecommendedMovies";
import "./RecommendedMovies.css";
import { getMovies } from "../../../service/productServices";
import { Pagination } from "@mui/material";

const RecommendedMoviesContainer = () => {
  const [dataMovies, setDataMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const resultsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMovies();
        setDataMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!hasFetchedData) {
      fetchData();
      setHasFetchedData(true);
    }
  }, [hasFetchedData]);

  const indexInitial = (page - 1) * resultsPerPage;
  const indexEnd = indexInitial + resultsPerPage;
  const moviesPage = dataMovies.slice(indexInitial, indexEnd);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <h2 className="titleRecommendedMovies">Películas Recomendadas</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <RecommendedMovies dataMovies={moviesPage} />
      </Suspense>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(dataMovies.length / resultsPerPage)}
          page={page}
          onChange={handleChangePage}
          size="large"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
    </div>
  );
};

export default RecommendedMoviesContainer;
