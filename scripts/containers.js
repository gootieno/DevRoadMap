import { fullstack, python } from "./data.js";
import { handleFormToggle } from "./handers.js";
import { buildLocalStorage } from "./localStorage.js";
import { renderForm } from "./utilities.js";

export const initializePage = () => {
  buildFormHeadingContainer();
  buildSelectFormContainer();
  buildFormContainer();
};

export const buildSelectFormContainer = () => {
  const selectFormContainer = document.createElement("div");
  const fullStackForm = document.createElement("input");
  const fullStackFormHeading = document.createElement("label");

  const pythonForm = document.createElement("input");
  const pythonFormHeading = document.createElement("label");

  selectFormContainer.setAttribute("id", "select-form-container");
  selectFormContainer.style.display = "flex";
  selectFormContainer.style.justifyContent = "center";

  fullStackForm.setAttribute("class", "fullstack-form-item");
  fullStackForm.setAttribute("class", "form-types");
  fullStackForm.setAttribute("type", "radio");
  fullStackForm.setAttribute("name", "fullstack");
  fullStackForm.setAttribute("value", "fullstack");

  fullStackFormHeading.setAttribute("class", "fullstack-form-item");
  fullStackFormHeading.innerText = "Full Stack";

  pythonForm.setAttribute("class", "python-form-item");
  pythonForm.setAttribute("class", "form-types");
  pythonForm.setAttribute("type", "radio");
  pythonForm.setAttribute("name", "python");
  pythonForm.setAttribute("value", "python");
  pythonFormHeading.innerText = "Python";

  pythonFormHeading.setAttribute("class", "python-form-item");

  fullStackForm.addEventListener("input", handleFormToggle);
  pythonForm.addEventListener("input", handleFormToggle);

  const setting = localStorage.getItem("form-type");

  switch (setting) {
    case "python":
      pythonForm.checked = true;
      fullStackForm.checked = false;
      break;
    case "fullstack":
      pythonForm.checked = false;
      fullStackForm.checked = true;
      break;
    default:
      fullStackForm.checked = true;
      localStorage.setItem("form-type", "fullstack");
      break;
  }

  selectFormContainer.append(
    fullStackForm,
    fullStackFormHeading,
    pythonForm,
    pythonFormHeading
  );
  document.body.appendChild(selectFormContainer);
};

const buildFormHeadingContainer = () => {
  const body = document.querySelector("body");
  const formHeadingContainer = document.createElement("div");
  const formHeading = document.createElement("h1");
  const headingMenuContainer = document.createElement("span");
  const headingMenu = document.createElement("i");

  const headingAttributes = [["id", "form-heading"]];

  headingMenuContainer.setAttribute("id", "heading-menu-container");

  headingMenu.setAttribute("id", "heading-menu");
  headingMenu.setAttribute("class", "fa fa-bars");
  headingMenu.setAttribute("aria-hidden", true);

  headingMenuContainer.style.width = "fit-content";
  headingMenuContainer.style.height = "auto";
  headingMenuContainer.style.position = "absolute";
  headingMenuContainer.style.top = "1.5rem";
  headingMenuContainer.style.right = "5%";

  headingMenu.style.cursor = "pointer";

  buildAttributes(formHeading, headingAttributes);

  formHeading.innerText = "Dev Roadmap";

  formHeadingContainer.setAttribute("id", "form-heading-container");

  formHeadingContainer.style.boxShadow = "0px 2px 4px black";

  headingMenuContainer.appendChild(headingMenu);

  // heading styles
  formHeading.style.textAlign = "center";
  formHeading.style.cursor = "default";
  formHeading.style.paddingBottom = "1%";
  formHeading.style.paddingTop = "1rem";
  formHeading.style.margin = "0";

  formHeadingContainer.style.position = "relative";
  formHeadingContainer.style.width = "100%";

  body.style.margin = "0";
  body.style.display = "flex";
  body.style.flexDirection = "column";
  body.style.justifyContent = "space-between";
  body.style.height = "100%";
  body.style.gap = "30px";

  formHeadingContainer.appendChild(formHeading);
  formHeadingContainer.appendChild(headingMenuContainer);
  body.appendChild(formHeadingContainer);

  buildMenuItems();
};

const buildMenuItems = () => {
  const headingMenuContainer = document.getElementById(
    "heading-menu-container"
  );

  const menuContainer = document.createElement("ul");

  const clearForm = document.createElement("li");
  clearForm.innerText = "Clear Form";

  clearForm.style.listStyle = "none";
  clearForm.style.cursor = "pointer";
  clearForm.style.borderBottom = "1px solid gray";
  clearForm.style.margin = "0px 10px";
  clearForm.style.marginBottom = "10px";
  clearForm.style.paddingTop = "10px";

  clearForm.setAttribute("class", "menu-items menu");
  clearForm.setAttribute("id", "clear-form");
  menuContainer.appendChild(clearForm);

  menuContainer.setAttribute("id", "menu-container");
  menuContainer.setAttribute("class", "menu hide-menu");
  menuContainer.style.width = "max-content";
  menuContainer.style.position = "absolute";
  menuContainer.style.boxShadow = "0px 0px 5px gray";
  menuContainer.style.backgroundColor = "lightgrey";
  menuContainer.style.borderRadius = "7px";
  menuContainer.style.top = "0";
  menuContainer.style.right = "30%";
  menuContainer.style.boxShadow = "0px 0px 4px black";

  headingMenuContainer.appendChild(menuContainer);
  buildTheme();
};

let FORM_NUMBER = 1;

const buildTheme = () => {
  const headingMenuContainer = document.getElementById("menu-container");
  const themeHeading = document.createElement("span");
  const darkModeLabel = document.createElement("label");
  const lightModeLabel = document.createElement("label");
  const darkMode = document.createElement("input");
  const lightMode = document.createElement("input");

  const menuInputContainer = document.createElement("div");

  menuInputContainer.setAttribute("id", "menu-input-container");
  menuInputContainer.setAttribute("class", "menu-items");

  menuInputContainer.style.margin = "0";
  menuInputContainer.style.display = "grid";
  menuInputContainer.style.marginBottom = "10px";
  menuInputContainer.style.paddingBottom = "10px";

  darkMode.setAttribute("type", "radio");
  lightMode.setAttribute("type", "radio");

  darkMode.setAttribute("id", "dark-mode");
  darkMode.setAttribute("class", "theme-inputs menu");
  darkMode.setAttribute("value", "dark");

  lightMode.setAttribute("class", "theme-inputs menu");
  lightMode.setAttribute("id", "light-mode");
  lightMode.setAttribute("value", "light");

  darkMode.setAttribute("name", "theme-input-buttons");
  lightMode.setAttribute("name", "theme-input-buttons");

  themeHeading.innerText = "Theme";
  themeHeading.style.cursor = "default";
  themeHeading.style.display = "block";
  themeHeading.style.margin = "5px 0px";

  themeHeading.setAttribute("id", "theme-heading");
  themeHeading.setAttribute("class", "menu menu-items");

  lightModeLabel.setAttribute("class", "menu");
  darkModeLabel.setAttribute("class", "menu");

  darkModeLabel.innerText = "Dark Mode";
  lightModeLabel.innerText = "Light Mode";

  lightMode.style.margin = "0px";
  lightMode.style.marginRight = "10px";
  darkMode.style.margin = "0px";
  darkMode.style.marginRight = "10px";

  const localStorageTheme = localStorage.getItem("theme-settings");

  if (localStorageTheme) {
    let themeSettings = JSON.parse(localStorageTheme);
    darkMode.checked = themeSettings.darkMode;
    lightMode.checked = themeSettings.lightMode;
  }

  if (darkMode.checked === true) document.body.classList.add("darkModeOn");
  else document.body.classList.add("darkModeOff");

  menuInputContainer.append(darkMode, darkModeLabel, lightMode, lightModeLabel);
  headingMenuContainer.append(themeHeading, menuInputContainer);
};

const buildFormContainer = () => {
  const formContainer = document.createElement("section");

  formContainer.style.margin = "0 auto";
  formContainer.style.padding = "5% 5%";

  formContainer.style.borderRadius = "10px";
  formContainer.style.boxShadow = "0px 0px 4px black";

  formContainer.style.height = "70%";
  formContainer.style.marginBottom = "5%";

  formContainer.setAttribute("id", "form-container");
  document.body.appendChild(formContainer);
  buildForm();
};

export const buildForm = () => {
  const formName = localStorage.getItem("form-type");
  const formList = document.createElement("div");

  console.log("form type ", formName);

  const formContainer = renderForm(formName);
  formList.children[0] = formContainer;
  document.body.appendChild(formList);
};

const buildAttributes = (element, attributeLists) => {
  for (const [attribute, attributeValue] of attributeLists) {
    element.setAttribute(attribute, attributeValue);
  }
};
