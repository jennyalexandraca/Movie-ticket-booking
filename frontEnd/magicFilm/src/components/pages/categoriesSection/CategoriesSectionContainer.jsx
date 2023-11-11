import CategoriesSection from "./CategoriesSection";
import "./categoriesSection.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieByCategoryId } from "../../../service/productServices";

import { getCategories } from "../../../service/categoryServices";
const CategoriesSectionContainer = () => {
  const { category_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [dataMovies, setDataMovies] = useState([]);
  const [activeButtonCategory, setActiveButtonCategory] = useState(null);

  useEffect(() => {
    setActiveButtonCategory(category_id);
    getCategories().then((res) => {
      const cat = [...res.data, { id: 0, title: "Todas" }];
      setCategories(cat);
    });
    getMovieByCategoryId(category_id)
      .then((res) => {
        setDataMovies(res.data);
      })
      .catch((error) => console.log(error));
  }, [category_id]);

  return (
    <div>
      <h2 className="titleCategoryMovies"> Busca películas por categoría</h2>
      <CategoriesSection
        categories={categories}
        dataMovies={dataMovies}
        category={category_id}
        activeButtonCategory={activeButtonCategory}
      />
    </div>
  );
};

export default CategoriesSectionContainer;
