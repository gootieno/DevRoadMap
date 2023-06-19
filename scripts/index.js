import { initializePage } from "./containers.js";
import { clearForm } from "./localStorage.js";

window.addEventListener("DOMContentLoaded", () => {
  initializePage();

  const body = document.querySelector("body");
  const menuContainer = document.querySelector("#menu-container");

  body.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!menuContainer.className.includes("hide-menu"))
      menuContainer.classList.add("hide-menu");
  });

  const themeInputs = document.querySelectorAll(".theme-inputs");

  themeInputs.forEach((themeInput) => {
    themeInput.addEventListener("input", (e) => {
      if (e.target.value === "dark") {
        document.body.classList.add("darkModeOn");
        document.body.classList.remove("darkModeOff");
        localStorage.setItem(
          "theme-settings",
          JSON.stringify({ darkMode: true, lightMode: false })
        );
      } else {
        document.body.classList.remove("darkModeOn");
        document.body.classList.add("darkModeOff");
        localStorage.setItem(
          "theme-settings",
          JSON.stringify({ darkMode: false, lightMode: true })
        );
      }
    });
  });

  const clearFormButton = document.getElementById("clear-form");

  clearFormButton.addEventListener("click", (e) => {
    clearForm("form-storage");
    //();
  });

  const menu = document.getElementById("heading-menu");

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("cals", menuContainer.className);
    if (menuContainer.className.includes("hide-menu")) {
      menuContainer.classList.remove("hide-menu");
    } else {
      menuContainer.classList.add("hide-menu");
    }
  });

  const formInputs = document.querySelectorAll(".form-inputs");

  formInputs.forEach((formInput) => {
    formInput.addEventListener("input", (e) => {
      const inputName = e.target.dataset.fieldName;

      const formLabel = document.querySelector(
        `label[data-field-name=${inputName}]`
      );

      const formStorage = JSON.parse(localStorage.getItem("form-storage"));

      if (e.target.checked) {
        formStorage[e.target.name] = "true";
        formLabel.style.textDecoration = "line-through";
        formLabel.style.color = "green";
        e.target.removeAttribute("checked");
      } else {
        e.target.setAttribute("checked", "false");
        formStorage[e.target.name] = "false";
        formLabel.style.textDecoration = "none";
        formLabel.style.color = "inherit";
      }

      localStorage.setItem("form-storage", JSON.stringify(formStorage));
    });
  });
});
