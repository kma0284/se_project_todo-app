export default class Todo {
  constructor(data, templateSelector, counter) {
    this._name = data.name;
    this._date = data.date;
    this._id = data.id;
    this._completed = data.completed || false;

    this._templateSelector = templateSelector;
    this._counter = counter; // reference to TodoCounter
  }

  // clone template and set values
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
    return template;
  }

  // setup events: checkbox and delete button
  _setEventListeners() {
    // checkbox toggle
    this._checkbox.addEventListener("change", () => {
      this._completed = this._checkbox.checked;
      this._counter.updateCompleted(this._completed);
    });

    // delete button
    this._deleteButton.addEventListener("click", () => {
      if (this._completed) {
        this._counter.updateCompleted(false); // decrease completed if it was checked
      }
      this._counter.updateTotal(false); // decrease total
      this._element.remove();
    });
  }

  // generate DOM element
  getView() {
    this._element = this._getTemplate();

    // ✅ Use the correct class names matching the template
    this._checkbox = this._element.querySelector(".todo__completed");
    this._deleteButton = this._element.querySelector(".todo__delete-btn");
    this._nameElement = this._element.querySelector(".todo__name");
    this._dateElement = this._element.querySelector(".todo__date");

    // set initial values
    this._nameElement.textContent = this._name;
    this._dateElement.textContent = this._date
      ? this._date.toLocaleDateString()
      : "";

    this._checkbox.checked = this._completed;

    // increment completed if this todo is initially checked
    if (this._completed) {
      this._counter.updateCompleted(true);
    }

    this._setEventListeners();

    return this._element;
  }
}
