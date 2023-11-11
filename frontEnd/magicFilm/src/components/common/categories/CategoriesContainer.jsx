import Categories from "./Categories";

import { getCategories } from "../../../service/categoryServices";
import { useEffect, useState } from "react";
const CategoriesContainer = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let canceled = true;
    // setLoading(true);
    getCategories().then((res) => {
      if (canceled) {
        setCategories(res.data?.slice(0, 4));
        // setData(data);
        // setLoading(false);
      }
    });
    return () => (canceled = false);
  }, []);
  return (
    <>
      <Categories categories={categories} setCategories={setCategories} />
    </>
  );
};

export default CategoriesContainer;
