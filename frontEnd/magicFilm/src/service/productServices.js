import { axiosInstance, axiosProtected } from "./axiosInstance";

export const getMovies = () => {
  let movies = axiosInstance.get("/movie");
  return movies;
};

export const getMovieById = (id) => {
  return axiosInstance.get(`/movie/${id}`);
};

export const getMovieByCategoryId = (category_id) => {
  if (category_id === "0") { // En caso que sean todas
    return axiosInstance.get(`/movie`);
  }

  return axiosInstance.get(`/movie/category/${category_id}`).then((res) => { //Filtra el resto de categorias
    const filteredMovies = res.data.filter(
      (movie) => parseInt(movie.category.id) === parseInt(category_id)
    );
    return { data: filteredMovies };
  });
};

export const getMovie = (title) => {
  let movies = axiosInstance.get("/movie", { params: { title: title } });
  return movies;
};

export const deleteMovie = (id) => {
  return axiosInstance.delete(`/movie/${id}`);
};

export const updateMovie = (id, data) => {
  return axiosInstance.patch(`/movie/${id}`, data);
};

export const createMovie = (data) => {

  return axiosProtected.post(`/movie`, data);
};

export const searchMovie = (search) => {

  return axiosInstance.get(`/movie/search?search_input=${search}`);
};


// export const getCategories = () => {
//   // return axiosInstance.get(`/categories`);
//   // ESTO ES TEMPORAL
//   const categories = [
//     { id: "1", title: "Cartelera", logo:"https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684697721/Cartelera_iw60vx.png",zoom: "https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684978967/Cartelera_eerfch.png"},
//     { id: "2", title: "Estrenos",logo:"https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684697721/Estrenos_l0gwwa.png", zoom:"https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684978863/Estrenos_etsgfy.png" },
//     { id: "3", title: "Preventa", logo: "https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684697721/Preventa_mcttwl.png", zoom:"https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684978919/Preventa_p2hofm.png"},
//     { id: "4", title: "Promociones",logo:"https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684977985/promocionesMobile_jyofic.png", zoom:"https://res.cloudinary.com/dtzs6lm4b/image/upload/v1684979172/Promociones_h5tjv8.png" },
//   ];
//   return new Promise((resolve, reject) => {
//       setTimeout(function() {
//         resolve({data: categories});
//       }, 100);
//   });
// }





