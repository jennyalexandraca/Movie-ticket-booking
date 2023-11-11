import React, { useState } from "react";
import "./addCategory.css";
import iconClip from "../../../assets/icon/clip.svg";
import { Modal } from "@mui/material";
import AddCategoryForm from "./AddCategoryForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalAddCategory = ({ open, saveCategory , handleClose}) => {
  return (
    <>
      <Modal disableEnforceFocus open={open} onClose={handleClose}>
        <AddCategoryForm saveCategory={saveCategory} />
      </Modal>
    </>
  );
};

export default ModalAddCategory;
