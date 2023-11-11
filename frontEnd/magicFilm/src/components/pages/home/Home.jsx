import React from "react";
// import SearchMoviesContainer from "../../common/searchMovies/SearchMoviesContainer";
import RecommendedMoviesContainer from "../../common/recommendedMovies/RecommendedMoviesContainer";
import CategoriesContainer from "../../common/categories/CategoriesContainer";
import SearchButton from "../../common/searchMovies/SearchButton";

const Home = () => {
  return (
    <>
      <SearchButton home={true} />
      <CategoriesContainer />
      <RecommendedMoviesContainer />
    </>
  );
};

export default Home;
