import { buildForm } from "./containers.js";

export const addToLocalStorage = (name) => {
  localStorage.setItem(JSON.stringify(name), true);
};

export const buildLocalStorage = (storageName) => {
  switch (storageName) {
    case "form-storage":
      localStorage.setItem("form-storage", JSON.stringify({}));
      break;
    case "theme-settings":
      localStorage.setItem(
        "theme-settings",
        JSON.stringify({ darkMode: false, lightMode: false })
      );
      break;
    default:
      alert(new Error("No storage name"));
  }
};

export const clearForm = (storageName) => {
  buildLocalStorage(storageName);
  document.getElementById("form-container").remove();
  buildForm();
};
