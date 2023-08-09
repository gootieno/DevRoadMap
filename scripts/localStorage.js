// localstorage.js

export function saveFormData(formType, formData) {
    localStorage.setItem(`formData-${formType}`, JSON.stringify(formData));
  }
  
  export function getFormData(formType) {
    const formData = localStorage.getItem(`formData-${formType}`);
    return formData ? JSON.parse(formData) : [];
  }
  
  export function clearFormData(formType) {
    localStorage.removeItem(`formData-${formType}`);
  }
  