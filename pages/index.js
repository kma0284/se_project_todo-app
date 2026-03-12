// pages/index.js
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// ===== DOM ELEMENTS =====
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

// ===== TODO COUNTER =====
const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

// ===== CREATE TODO ELEMENT =====
const createTodo = (data, counter) => {
  const todo = new Todo(data, "#todo-template", counter);
  return todo.getView();
};

// ===== SECTION INSTANCE =====
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = createTodo(item, todoCounter);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

// Render initial todos
section.renderItems();

// ===== POPUP WITH FORM =====
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const date = formData.date ? new Date(formData.date) : null;
  if (date) date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  const todoElement = createTodo(
    { name: formData.name, date, id, completed: false },
    todoCounter,
  );

  section.addItem(todoElement);

  // update total count
  todoCounter.updateTotal(true);

  addTodoPopup.close();
});

// Set popup event listeners
addTodoPopup.setEventListeners();

// Open popup when button clicked
addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  addTodoPopup.open();
});

// ===== FORM VALIDATION =====
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
