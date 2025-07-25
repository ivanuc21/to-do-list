const taskInput = document.getElementById('input-task')
const taskAddButton = document.getElementById('task-add-button')
const taskList = document.getElementById('task-list')


/**
 * Al cargarse el documento se ejecutara la funcion que cargara los elementos(tareas)
 * al documento, utiliando la funcion 'addTasks'
 */
document.addEventListener('DOMContentLoaded', function () {
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
taskAddButton.addEventListener('click', function () {
	// se obtiene el valor ingresado por el usuario y se quitan espacios en caso de haber
	const taskValue = taskInput.value.trim();
	// se evalua para asegurar que no este vacio 
	if (taskValue !== '') {
		// se obtienen las tareas almacenadas en local storage
		const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
		// se agrega al array obtenido, el objeto con los atributos y sus respectivos valores
		tasks.push({ text: taskValue, completed: false })

		// se actualiza el localstorage 
		localStorage.setItem('tasks', JSON.stringify(tasks))
		// se agrega la tarea nueva al documento y luego se limpia el campo de entrada
		addTask(taskValue, false)
		taskInput.value = ''
	}
})

function addTask(text, completed = false) {
	const li = document.createElement('li');
	li.classList.add('mb-2')
	if (completed) li.classList.add('done')

	const taskSpan = document.createElement('span')
	taskSpan.textContent = text
	taskSpan.addEventListener('click', function () {
		li.classList.toggle('done')
		updateStorage()
	})

	const modalMessageAccept = document.getElementById('message-main-container');
	const succesModal = document.getElementById('success-message-container');
	const acceptButon = document.getElementById('accept-button')
	const cancelButton = document.getElementById('cancel-button');
	const successButton = document.getElementById('success-button');

	const deleteButton = document.createElement('button');
	deleteButton.classList.add('btn', 'btn-danger', 'm-2')
	deleteButton.textContent = 'Eliminar'

	deleteButton.addEventListener('click', function () {

		modalMessageAccept.style.display = 'flex'
		acceptButon.addEventListener('click', function () {
			modalMessageAccept.style.display = 'none'
			li.remove()

			succesModal.style.display = 'flex'
			updateStorage()
			successButton.addEventListener('click', function () {
				succesModal.style.display = 'none'
			})
		})
		cancelButton.addEventListener('click', function(){
			modalMessageAccept.style.display = 'none'
		})
	})

	li.appendChild(taskSpan)
	li.appendChild(deleteButton)
	taskList.appendChild(li)
}



