const taskInput = document.getElementById('input-task')
const taskAddButton = document.getElementById('task-add-button')
const taskList = document.getElementById('task-list')


const messageContainer = document.getElementById('message-main-container')
/**
 * Al cargarse el documento se ejecutara la funcion que cargara los elementos(tareas)
 * al documento, utiliando la funcion 'addTasks'
 */
document.addEventListener('DOMContentLoaded', function(){
	/*
	Obtener tareas desde el local storage, en caso de que aun no hayan elementos
	, se devuelve un array vacio */
	const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.forEach(element => {
		addTask(element.text, element.completed)
	});
})