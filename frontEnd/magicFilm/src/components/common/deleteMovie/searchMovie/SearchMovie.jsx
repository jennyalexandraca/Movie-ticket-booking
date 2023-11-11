import "./searchMovie.css";

const SearchMovie = ({ handleSearch, dataSearch, setDataSearch }) => {
  const handleReset = (e) => {
    setDataSearch("");
  };

  return (
    <div className="container-search">
      <form className="form-search-movies" action="/admin?#">
        <input
          type="text"
          className="input-search-movies"
          placeholder="Ingrese el nombre película"
          onChange={(e) => setDataSearch(e.target.value)}
          value={dataSearch}
        />

        <button
          onClick={(e) => {
            handleSearch(dataSearch);
            e.preventDefault();
          }}
          className="solidCancel"
          //className="button-search-movies"
        >
          Buscar
        </button>
        {/* <button
          onClick={(e) => {
            handleReset;
            e.preventDefault();
          }}
        >
          Cancelar
        </button> */}
      </form>
    </div>
  );
};

export default SearchMovie;
