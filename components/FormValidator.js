class FormValidator {
  constructor(settings, formEl) {
    // Store configuration settings and the form element
    this._settings = settings;
    this._inputSelector = settings.inputSelector; // Selector for input fields
    this._submitButtonSelector = settings.submitButtonSelector; // Selector for submit button
    this._errorClass = settings.errorClass; // CSS class to show error messages
    this._inputErrorClass = settings.inputErrorClass; // CSS class to highlight invalid inputs
    this._inactiveButtonClass = settings.inactiveButtonClass; // CSS class for disabled button
    this._formEl = formEl; // Reference to the form element

    // Cache DOM nodes to avoid querying multiple times
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector),
    ); // All inputs in the form
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector,
    ); // Submit button
  }

  // Check if any input is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Show an error message for a specific input
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`,
    );
    inputElement.classList.add(this._inputErrorClass); // Highlight the invalid input
    errorElement.textContent = errorMessage; // Set the error message
    errorElement.classList.add(this._errorClass); // Apply CSS styling to show error
  }

  // Hide the error message for a specific input
  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`,
    );
    inputElement.classList.remove(this._inputErrorClass); // Remove highlight from input
    errorElement.classList.remove(this._errorClass); // Remove error styling
    errorElement.textContent = ""; // Clear the error message
  }

  // Check the validity of a single input and show/hide errors
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Disable the submit button and apply inactive styles
  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // Enable the submit button and remove inactive styles
  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Enable or disable the submit button based on input validity
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  // Add event listeners to inputs for real-time validation
  _setEventListeners() {
    this._toggleButtonState(); // Set initial button state on load

    // Listen for input events on each field
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Validate current input
        this._toggleButtonState(); // Update submit button state
      });
    });
  }

  // Public method to enable form validation
  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent default form submission
    });

    this._setEventListeners(); // Initialize input event listeners
  }

  // Public method to reset form and validation state
  resetValidation() {
    this._formEl.reset(); // Reset all input fields to default values

    // Hide all input errors
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement),
    );

    this._toggleButtonState(); // Reset submit button state
  }
}

export default FormValidator;
