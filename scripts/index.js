import { formFieldHeadings } from "./data.js";
import { saveFormData, getFormData, clearFormData } from "./localstorage.js";

const formTypes = Object.keys(formFieldHeadings);
let currentFormType = localStorage.getItem("currentFormType") || formTypes[0];

function createFormSection(heading, todos, formData, formType) {
  const section = document.createElement("div");
  section.className = "form-section";

  const headingElement = document.createElement("h2");
  headingElement.textContent = heading;
  section.appendChild(headingElement);

  todos.forEach((todo) => {
    const label = document.createElement("label");
    label.textContent = todo;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "checkbox";
    input.checked = formData.includes(todo);

    const labelContainer = document.createElement("div");
    labelContainer.className = "label-container";
    labelContainer.appendChild(input);
    labelContainer.appendChild(label);

    section.appendChild(labelContainer);

    input.addEventListener("change", () => {
      if (input.checked) {
        formData.push(todo);
      } else {
        const index = formData.indexOf(todo);
        if (index !== -1) {
          formData.splice(index, 1);
        }
      }
      saveFormData(formType, formData);
    });
  });

  return section;
}

function renderForm(formType) {
  const formFields = formFieldHeadings[formType];
  if (!formFields) return;

  const formContainer = document.getElementById("form-container");
  removeAllChildren(formContainer);

  const formData = getFormData(formType);

  for (const sectionHeading in formFields) {
    const todos = formFields[sectionHeading];
    const formSection = createFormSection(
      sectionHeading,
      todos,
      formData,
      formType
    );
    formContainer.appendChild(formSection);
  }
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createButton(text, parent, formType) {
  const label = document.createElement("label");
  label.textContent = text;

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "formType";
  input.value = formType;
  input.addEventListener("change", () => {
    renderForm(formType);
    createHeader(formType);
  });

  label.appendChild(input);
  parent.appendChild(label);
  return input;
}

function createHeader(formType) {
  const header = document.querySelector(".navbar .header");
  if (header) {
    header.textContent = formType;
  }

  const formTypeRadioContainer = document.querySelector(
    ".form-type-radio-container"
  );
  const formTypeButtons = formTypeRadioContainer.querySelectorAll(
    'input[type="radio"]'
  );
  formTypeButtons.forEach((button) => {
    if (button.value === formType) {
      button.checked = true;
    } else {
      button.checked = false;
    }
  });

  localStorage.setItem("currentFormType", formType); // Save the current form type
}

function createPage() {
  const navbar = document.createElement("nav");
  navbar.className = "navbar";
  document.body.insertBefore(navbar, document.body.firstChild);

  const header = document.createElement("div");
  header.className = "header";
  navbar.appendChild(header);

  const dropdownButton = document.createElement("button");
  dropdownButton.id = "dropdown-button";
  dropdownButton.textContent = "Menu";
  dropdownButton.addEventListener("click", toggleMenu);
  header.appendChild(dropdownButton);

  const heading = document.createElement("h1");
  heading.textContent = currentFormType;
  header.appendChild(heading);

  const formContainer = document.createElement("form");
  formContainer.id = "form-container";
  document.body.appendChild(formContainer);

  const formTypeRadioContainer = document.createElement("div");
  formTypeRadioContainer.className = "form-type-radio-container";
  formTypes.forEach((formType) => {
    createButton(formType, formTypeRadioContainer, formType);
  });
  navbar.appendChild(formTypeRadioContainer);

  // Render the initial form and header
  renderForm(currentFormType);
  createHeader(currentFormType);
}

function toggleMenu() {
  const dropdownMenu = document.getElementById("dropdown-menu");
  dropdownMenu.classList.toggle("open");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function clearCheckedInputs() {
  const form = document.querySelector("form");
  const checkboxes = form.querySelectorAll(".checkbox");
  const formType = document.querySelector(
    'input[name="formType"]:checked'
  ).value;
  const formData = getFormData(formType);

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.checked = false;
      const index = formData.indexOf(checkbox.nextSibling.textContent);
      if (index !== -1) {
        formData.splice(index, 1);
      }
    }
  });

  saveFormData(formType, formData);
}

window.addEventListener("DOMContentLoaded", createPage);
