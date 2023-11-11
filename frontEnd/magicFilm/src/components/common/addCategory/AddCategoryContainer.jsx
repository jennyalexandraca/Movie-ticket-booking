import React from "react";

import "./addCategory.css";
import AddCategoryForm from "./AddCategoryForm";
import ModalAddCategory from "./ModalAddCategory";
import {
  getCategories,
  createCategory,
} from "../../../service/categoryServices";
import Swal from "sweetalert2";

const AddCategoryContainer = ({
  open,
  selectCategory,
  setCategories,
  from,
}) => {
  const saveCategory = async (data) => {
    const create = await createCategory(data);
    if (from !== undefined && create.status === 200) {
      getCategories().then((res) => {
        setCategories(res.data);
        selectCategory(create.data.id);
        Swal.fire("Se creó correctamente la Categoria");
      });
    }
  };

  return (
    <>
      {from !== undefined ? (
        <ModalAddCategory
          open={open}
          saveCategory={saveCategory}
          handleClose={() => selectCategory("0")}
        />
      ) : (
        <AddCategoryForm saveCategory={saveCategory} />
      )}
    </>
  );
};
export default AddCategoryContainer;
