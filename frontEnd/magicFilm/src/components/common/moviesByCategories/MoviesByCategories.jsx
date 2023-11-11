import InfoMovie from "../infoMovie/InfoMovie";

const MoviesByCategories = ({ dataMovies }) => {
  return (
    <div className="container-home-card">
      {dataMovies.map((movies) => (
        <InfoMovie key={movies.id} movie={movies} />
      ))}
    </div>
  );
};

export default MoviesByCategories;
