import { buildForm } from "./containers.js";
import { renderForm } from "./utilities.js";

export const handleFormToggle = (e) => {
  const formTypes = document.querySelectorAll(".form-types");

  for (const type of formTypes) type.checked = false;
  e.target.checked = true;

  localStorage.setItem("form-type", e.target.name);

  const formContainer = document.querySelector("#form-container");

  renderForm(e.target.name);
};
