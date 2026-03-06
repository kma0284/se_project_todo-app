class Todo {
  constructor(data, selector) {
    this._data = data;
    this._name = data.name;
    this._completed = data.completed;
    this._selector = selector; // Template selector
  }

  // ======= TEMPLATE =======
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  // ======= NAME ELEMENT =======
  _generateNameEl() {
    this._nameEl = this._todoElement.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  // ======= EVENT HANDLERS =======
  _handleDelete = () => {
    this._todoElement.remove();
    this._todoElement = null; // Help garbage collection
  };

  _handleCheck = () => {
    this._completed = !this._completed;
  };

  // ======= EVENT LISTENERS =======
  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", this._handleDelete);
    this._todoCheckboxEl.addEventListener("change", this._handleCheck);
  }

  // ======= CHECKBOX & LABEL =======
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  // ======= DUE DATE =======
  _setDueDate() {
    this._dueDateObj = new Date(this._data.date);

    if (!isNaN(this._dueDateObj)) {
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

  // ======= GENERATE DOM =======
  getView() {
    this._todoElement = this._getTemplate(); // Clone template
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._generateNameEl(); // Populate name element
    this._setDueDate(); // Populate due date
    this._generateCheckboxEl(); // Setup checkbox and label
    this._setEventListeners(); // Attach event listeners

    return this._todoElement;
  }
}

export default Todo;
