// DOM Elements
const todoInput = document.getElementById("todo-input");
const todoAdd = document.getElementById("todo-add");
const todos = document.getElementById("todos");

// Load the existing todos in localstorage
document.addEventListener("DOMContentLoaded", getTodos);

// Add eventlistener to button
todoAdd.addEventListener("click", () => {
    if (todoInput.value != "") {
        todos.innerHTML += `
        <li class="todo">
        <p>${todoInput.value}</p>
        <i class="fas fa-times" id="todo-delete"></i>
        </li>`;
        saveTodos(todoInput.value);
        // Remove the input value
        todoInput.value = "";
    }
});

todos.addEventListener("click", e => {
    // Select the target element
    const todoItem = e.target;
    if (todoItem.classList[1] === "fa-times") {
        const todo = todoItem.parentElement;
        // Remove the todo
        removeTodos(todo);
        todo.remove();
    }
    // Complete the todo
    if (todoItem.classList[0] === "todo") {
        todoItem.classList.toggle("completed");
    }
});

// Save todos to local storage
function saveTodos(todo) {
    let todosList;
    if (localStorage.getItem("todos") === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }
    todosList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todosList));
}

// Get todos from local storage
function getTodos() {
    let todosList;
    if (localStorage.getItem("todos") === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }

    todosList.forEach(todo => {
        todos.innerHTML += `
        <li class="todo">
        <p>${todo}</p>
        <i class="fas fa-times" id="todo-delete"></i>
        </li>`;
    });
}

// Remove todo from local storage
function removeTodos(todo) {
    let todosList;
    if (localStorage.getItem("todos") === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todosList.splice(todosList.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todosList));
}
