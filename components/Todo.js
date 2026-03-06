class Todo {
  constructor(data, selector) {
    // Store todo data (name, id, completed, date, etc.)
    this._data = data;

    // Template element selector (used to clone todo HTML structure)
    this._templateElement = document.querySelector(selector);
  }

  // Add event listeners for delete button and checkbox
  _setEventListeners() {
    // Delete todo when delete button is clicked
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });

    // Toggle completed state when checkbox changes
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  // Initialize checkbox and label, set checked state and id
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed"); // Checkbox element
    this._todoLabel = this._todoElement.querySelector(".todo__label"); // Label element

    // Set initial state and link label to checkbox
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  // Set and render the due date if valid
  _setDueDate() {
    this._dueDateObj = new Date(this._data.date); // Convert stored date to Date object

    if (!isNaN(this._dueDateObj)) {
      // Format date as "Due: Month Day, Year"
      this._todoDate.textContent = `Due: ${this._dueDateObj.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      )}`;
    }
  }

  // Create and return the DOM element representing this todo
  getView() {
    // Clone the template element for a new todo
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    // Cache elements for manipulation
    this._todoNameEl = this._todoElement.querySelector(".todo__name"); // Todo name
    this._todoDate = this._todoElement.querySelector(".todo__date"); // Due date
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn"); // Delete button

    // Set text content
    this._todoNameEl.textContent = this._data.name;

    // Render the due date
    this._setDueDate();

    // Set up checkbox and label
    this._generateCheckboxEl();

    // Attach event listeners
    this._setEventListeners();

    // Return the completed DOM element for rendering
    return this._todoElement;
  }
}

export default Todo;
