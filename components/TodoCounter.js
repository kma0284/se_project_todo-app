export default class TodoCounter {
  constructor(todos, selector) {
    // select the DOM element for the counter
    this._element = document.querySelector(selector);

    // total number of todos
    this._total = todos.length;

    // number of completed todos (assumes todos have a `completed` boolean)
    this._completed = todos.filter((todo) => todo.completed).length;

    // update text on initialization
    this._updateText();
  }

  // update completed count
  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
      if (this._completed < 0) this._completed = 0;
    }
    this._updateText();
  };

  // update total count
  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
      if (this._total < 0) this._total = 0;
    }
    this._updateText();
  };

  // update the text content of the counter element
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
