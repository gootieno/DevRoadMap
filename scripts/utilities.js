import * as forms from "./data.js";

let FORM_NUMBER = 1;

export const renderForm = (formName) => {
  const formContainer = document.getElementById("form-container");

  let formStorage;
  if (localStorage.getItem("form-storage")) {
    formStorage = JSON.parse(localStorage.getItem("form-storage"));
  } else {
    formStorage = {};
  }

  for (const formHeading in forms[formName]) {
    const container = document.createElement("div");
    const heading = document.createElement("h2");

    container.setAttribute("id", `form-${formHeading.toLowerCase()}-container`);

    heading.innerText = formHeading;
    heading.setAttribute("class", "form-headings");
    container.appendChild(heading);

    for (const formContent of forms[formName][formHeading]) {
      const formGroupContainer = document.createElement("div");
      const formLabel = document.createElement("label");
      const formInput = document.createElement("input");

      formLabel.setAttribute("class", formHeading.toLowerCase());
      formLabel.setAttribute("for", formContent);
      formLabel.dataset.fieldName = "formHeading" + FORM_NUMBER;
      formLabel.innerText = formContent;

      formInput.setAttribute("type", "checkbox");
      formInput.setAttribute("name", formContent.toLowerCase());
      formInput.setAttribute("class", "form-inputs");
      formInput.dataset.fieldName = "formHeading" + FORM_NUMBER;

      FORM_NUMBER++;

      if (formStorage[formContent] === "true") {
        formInput.setAttribute("checked", "true");
        formLabel.style.textDecoration = "line-through";
        formLabel.style.color = "green";
      } else {
        formStorage[formContent] = "false";
        formLabel.style.textDecoration = "none";
        formLabel.style.color = "inherit";
      }

      formGroupContainer.style.width = "100%";
      formGroupContainer.appendChild(formInput);
      formGroupContainer.appendChild(formLabel);

      container.appendChild(formGroupContainer);
    }

    formContainer.appendChild(container);
  }

  localStorage.setItem("form-storage", JSON.stringify(formStorage));
  return formContainer;
};
