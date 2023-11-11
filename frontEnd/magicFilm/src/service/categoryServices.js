import { axiosInstance } from "./axiosInstance";

export const getCategories = () => {
  let category = axiosInstance.get("/category");
  return category;
};

export const getCategoryById = (id) => {
  return axiosInstance.get(`/category/${id}`);
};

/* export const getCategory = (title) => {
  let category = axiosInstance.get("/category", {
    params: { title: title },
  });
  return category;
}; */

export const deleteCategory = (id) => {
  return axiosInstance.delete(`/category/${id}`);
};

export const updateCategory = (id, data) => {
  return axiosInstance.patch(`/category/${id}`, data);
};

export const createCategory = (data) => {
  return axiosInstance.post(`/category`, data);
};
