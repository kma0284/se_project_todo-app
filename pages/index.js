import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

// ======= DOM ELEMENTS =======
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// ======= MODAL FUNCTIONS =======
const openModal = (modal) => modal.classList.add("popup_visible");
const closeModal = (modal) => modal.classList.remove("popup_visible");

// ======= TODO HELPER FUNCTION =======
// Generate a Todo element and append to the list
const renderTodo = (data) => {
  const todo = new Todo(data, "#todo-template"); // Create Todo instance
  const todoElement = todo.getView(); // Generate DOM element
  todosList.append(todoElement); // Append to the list
};

// ======= EVENT LISTENERS =======

// Open add-todo popup
addTodoButton.addEventListener("click", () => openModal(addTodoPopup));

// Close add-todo popup
addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));

// Handle form submission for adding a new todo
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  // Create unique ID for the new todo
  const id = uuidv4();

  // Render the new todo
  renderTodo({ name, date, id });

  // Close popup and reset form/validation
  closeModal(addTodoPopup);
  newTodoValidator.resetValidation();
});

// ======= INITIALIZE EXISTING TODOS =======
initialTodos.forEach((item) => renderTodo(item)); // Reuse helper to append todos

// ======= ENABLE FORM VALIDATION =======
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
