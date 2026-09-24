"use strict";

const taskForm = document.querySelector("#task-form");
const newTaskInput = document.querySelector("#new-task");
const taskList = document.querySelector("#task-list");
const deleteCompletedButton = document.querySelector("#delete-completed");
const deleteAllButton = document.querySelector("#delete-all");

// Informaciones de testes pero editables
let todos = [
	{ text: "Comprar leche", completed: false },
	{ text: "Llevar al perro al parque", completed: false },
	{ text: "Terminar el proyecto", completed: false },
];

// Verifica si hay informaciones en localStorage
const savedTodos = localStorage.getItem("todos");

// Si no hay, crea una nueva lista utilizando las informaciones de teste
if (savedTodos !== null) {
	todos = JSON.parse(savedTodos);
}

// Funcion principal donde se monta la lista, item por item, en el html
function renderTodos() {
	localStorage.setItem("todos", JSON.stringify(todos));
	taskList.replaceChildren();

	todos.forEach((todo, index) => {
		const item = document.createElement("li");
		const label = document.createElement("label");
		const checkbox = document.createElement("input");

		checkbox.type = "checkbox";
		checkbox.checked = todo.completed;
		checkbox.addEventListener("change", () => {
			todos[index].completed = checkbox.checked;
			renderTodos();
		});

		label.append(todo.text, checkbox);
		item.appendChild(label);
		item.classList.toggle("completed", todo.completed);
		taskList.appendChild(item);
	});
}

// ... subscripción a eventos para responder a interaciones del usuário
taskForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const text = newTaskInput.value.trim();

	// Descarte si no hay informaciones
	if (text === "") {
		return;
	}

	todos.push({ text, completed: false });
	newTaskInput.value = "";
	renderTodos();
});

deleteCompletedButton.addEventListener("click", () => {
	todos = todos.filter((todo) => !todo.completed);
	renderTodos();
});

deleteAllButton.addEventListener("click", () => {
	todos = [];
	renderTodos();
});

// Inicia la página actualizando la lista en la pantalla
renderTodos();
