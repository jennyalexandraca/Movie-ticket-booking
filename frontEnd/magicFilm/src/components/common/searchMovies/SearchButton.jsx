import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchButton = ({ home, search }) => {
  const [searchInput, setSearchInput] = useState(search || "");
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    let params = new URLSearchParams({ search_input: searchInput }).toString();
    console.log(`/search?${params}`);

    if (home === true && search === undefined) {
      navigate(`/search?${params}`);
    } else {
      setSearchParams(params, { replace: true });
    }
  };

  return (
    <form className="form-search-movies" onSubmit={handleSubmit}>
      <input
        required
        className="input-home-search-movies"
        placeholder="Nombre película"
        value={searchInput}
        pattern="^[a-zA-Z\s]+$"
        onChange={(event) => {
          event.target.setCustomValidity("");
          setSearchInput(event.target.value);
        }}
        onInvalid={(e) => {
          if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity(
              "El título de la película solo debe contener letras y espacios."
            );
          } else if (e.target.validity.valueMissing) {
            e.target.setCustomValidity(
              "Por favor, ingresa un título de película válido."
            );
          }
        }}
      />
      <button className="button-home-search-movies" type="submit">
        Buscar
      </button>
    </form>
  );
};

export default SearchButton;
