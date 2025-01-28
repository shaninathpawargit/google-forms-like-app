let formCounter = 0;
let forms = JSON.parse(localStorage.getItem('forms')) || [];

/** Add a field to the form */
function addField(type) {
  const formFields = document.getElementById('form-fields');
  const fieldId = `field-${Date.now()}`;
  const fieldElement = document.createElement('div');
  fieldElement.className = 'form-field';
  fieldElement.innerHTML = `
    <label>
      Field Label: <input type="text" placeholder="Enter field label">
    </label>
    ${type === 'text' ? '<input type="text" disabled>' : ''}
    ${type === 'radio' ? '<input type="radio" disabled>' : ''}
    ${type === 'checkbox' ? '<input type="checkbox" disabled>' : ''}
    <button onclick="removeField('${fieldId}')">Remove</button>
  `;
  fieldElement.id = fieldId;
  formFields.appendChild(fieldElement);
}

/** Remove a field */
function removeField(fieldId) {
  document.getElementById(fieldId).remove();
}

/** Save form to localStorage */
function saveForm() {
  const formFields = Array.from(document.getElementById('form-fields').children);
  const formData = formFields.map(field => {
    const label = field.querySelector('input[type="text"]').value;
    const type = field.querySelector('input:not([type="text"])').type;
    return { label, type };
  });

  const formId = `form-${Date.now()}`;
  forms.push({ id: formId, fields: formData });
  localStorage.setItem('forms', JSON.stringify(forms));
  alert('Form saved successfully!');
  loadForms();
}

/** Load forms from localStorage */
function loadForms() {
  const savedForms = document.getElementById('saved-forms');
  savedForms.innerHTML = '';
  forms.forEach(form => {
    const formElement = document.createElement('div');
    formElement.innerHTML = `
      <span>${form.id}</span>
      <button onclick="previewForm('${form.id}')">Preview</button>
      <button onclick="deleteForm('${form.id}')">Delete</button>
    `;
    savedForms.appendChild(formElement);
  });
}

/** Preview form */
function previewForm(formId) {
  const form = forms.find(f => f.id === formId);
  const previewContainer = document.getElementById('responses');
  previewContainer.style.display = 'block';
  const responseData = document.getElementById('response-data');
  responseData.innerHTML = '';
  form.fields.forEach(field => {
    const fieldElement = document.createElement('div');
    fieldElement.innerHTML = `
      <label>${field.label}</label>
      <input type="${field.type}" name="${field.label}">
    `;
    responseData.appendChild(fieldElement);
  });
}

/** Delete form */
function deleteForm(formId) {
  forms = forms.filter(form => form.id !== formId);
  localStorage.setItem('forms', JSON.stringify(forms));
  loadForms();
}

/** Initialize the app */
function init() {
  loadForms();
}

init();