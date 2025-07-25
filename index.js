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

/**
 * Al boton de agregar tarea se le agrega un esuchador de eventos para acptura cuando
 * se le da click
 */
taskAddButton.addEventListener('click', function(){
	// se obtiene el valor ingresado por el usuario y se quitan espacios en caso de haber
	const taskValue = taskInput.value.trim();
	// se evalua para asegurar que no este vacio 
	if(taskValue){
		// se obtienen las tareas almacenadas en local storage
		const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
		// se agrega al array obtenido, el objeto con los atributos y sus respectivos valores
		tasks.push({ text: taskValue, completed: false})

		// se actualiza el localstorage 
		localStorage.setItem('tasks', JSON.stringify(tasks))
		// se agrega la tarea nueva al documento y luego se limpia el campo de entrada
		addTask(taskValue, false)
		taskInput.value = ''
	}
})

