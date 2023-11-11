import React, { useEffect, useState } from "react";
import AddMovieForm from "./AddMovieForm";
import AddMoviePreview from "./AddMoviePreview";
import "./addMovie.css";
import { getCategories } from "../../../service/categoryServices";
import { createMovie } from "../../../service/productServices";
import { uploadFile } from "../../../service/awsUtils";
import Swal from "sweetalert2";
import { format, parse } from "date-fns";

const AddMovieContainer = () => {
  const [categories, setCategories] = useState([]);
  const [stateImages, setStateImages] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);
  const initialState = {
    title: "",
    release_date: "",
    gender: "",
    summary: "",
    image: "",
    trailer: "",
    category_id: "",
    /* file: "", */
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { file_image, image, category_id, ...data } = state;
    data.image = await uploadFile(image, data.title + "/");
    data.state = 1;
    data.category = { id: parseInt(category_id) };

    data.release_date = format(
      parse(data.release_date, "dd/MM/yyyy", new Date()),
      "yyyy-MM-dd"
    );
    const trailerImages = [];
    for (const image in stateImages) {
      const imageUploaded = await uploadFile(
        stateImages[image].image,
        data.title + "/trailer_images/"
      );
      trailerImages.push({
        image: imageUploaded,
      });
    }
    data = { ...data, trailer_images: trailerImages };
    const create = await createMovie(data);
    if (create.status === 200) {
      Swal.fire("Pelicula Creada correctamente", "", "success");
      setState(initialState);
    } else {
      Swal.fire("Error al crear la pelicula", "", "error");
    }
  };

  return (
    <div className="container-add-movie">
      <AddMovieForm
        state={state}
        setState={setState}
        categories={categories}
        setCategories={setCategories}
        stateImages={stateImages}
        setStateImages={setStateImages}
        handleSubmit={handleSubmit}
      >
        {state.title && state.image && state.category_id && (
          <AddMoviePreview
            state={state}
            setState={setState}
            initialState={initialState}
            categories={categories}
            stateImages={stateImages}
          />
        )}
      </AddMovieForm>
    </div>
  );
};

export default AddMovieContainer;
