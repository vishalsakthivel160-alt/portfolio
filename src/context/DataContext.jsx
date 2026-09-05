import { createContext, useContext, useEffect, useState } from "react";
import {
  subscribeToData,
  updateProfileData,
  updateContactData,
  updateResumeData,
  addProjectData,
  updateProjectData,
  deleteProjectData,
  addProductData,
  updateProductData,
  deleteProductData,
  uploadMediaFile,
} from "../services/storageService";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    profile: null,
    contact: null,
    resume: null,
    projects: [],
    products: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToData((updatedData) => {
      setData(updatedData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    ...data,
    loading,
    updateProfile: updateProfileData,
    updateContact: updateContactData,
    updateResume: updateResumeData,
    addProject: addProjectData,
    updateProject: updateProjectData,
    deleteProject: deleteProjectData,
    addProduct: addProductData,
    updateProduct: updateProductData,
    deleteProduct: deleteProductData,
    uploadFile: uploadMediaFile,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
