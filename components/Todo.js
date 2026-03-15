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
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  // setup events: checkbox and delete button
  _setEventListeners() {
    // checkbox toggle
    this._checkbox.addEventListener("change", () => {
      const isChecked = this._checkbox.checked;

      if (isChecked !== this._completed) {
        this._counter.updateCompleted(isChecked);
      }

      this._completed = isChecked;
    });

    // delete button
    this._deleteButton.addEventListener("click", () => {
      if (this._completed) {
        this._counter.updateCompleted(false);
      }

      this._counter.updateTotal(false);
      this._element.remove();
    });
  }

  // generate DOM element
  getView() {
    this._element = this._getTemplate();

    // elements
    this._checkbox = this._element.querySelector(".todo__completed");
    this._deleteButton = this._element.querySelector(".todo__delete-btn");
    this._nameElement = this._element.querySelector(".todo__name");
    this._dateElement = this._element.querySelector(".todo__date");

    // label
    const label = this._element.querySelector(".todo__label");

    // unique checkbox id
    this._checkbox.id = `todo-${this._id}`;

    // associate label with checkbox
    if (label) {
      label.htmlFor = this._checkbox.id;
    }

    // set text values
    this._nameElement.textContent = this._name;
    this._dateElement.textContent = this._date
      ? this._date.toLocaleDateString()
      : "";

    // set checkbox state
    this._checkbox.checked = this._completed;

    this._setEventListeners();

    return this._element;
  }
}
