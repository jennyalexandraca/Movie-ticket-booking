import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

import { MdDelete, MdAdd, MdClear } from "react-icons/md";
import "./addTrailerImages.css";

const CustomModal = ({ open, setOpen, stateImages, setStateImages }) => {
  const [imageFiles, setImageFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setImageFiles([...imageFiles, ...fileArray]);
  };

  const handleClearImages = () => {
    setImageFiles([]);
  };

  const handleDeleteImage = (index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log("imageFiles", imageFiles);
    setStateImages(imageFiles);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: "6px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="modal-header">
          <h1>Galeria de Imagenes</h1>
        </div>
        <div className="modal-body">
          <div className="button-row">
            <label htmlFor="fileInput" className="file-label">
              <MdAdd />
              {"  "}Agregar
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button className="clear-button" onClick={handleClearImages}>
              <MdClear />
              {"  "}Limpiar
            </button>
          </div>
          <div className="image-list">
            {imageFiles.map((file, index) => (
              <div className="image-item" key={index}>
                <p>{file.name}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteImage(index)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="modal-footer">
          <button className="solid" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
