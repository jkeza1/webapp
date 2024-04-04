function addTask() {
  
  const taskNameInput = document.getElementById('taskNameInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');
  const taskDateInput = document.getElementById('taskDateInput');
  const taskText = taskNameInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();
  const taskDate = taskDateInput.value;

  if (taskText && taskDescription && taskDate) {
    // Add the task to the list
    addTaskToList(taskText, taskDescription, taskDate, false);

    // Save tasks to localStorage
    saveTasksToLocalStorage();
    
    // Clear input fields after adding task
    taskNameInput.value = '';
    taskDescriptionInput.value = '';
    taskDateInput.value = '';
  } else {
    alert('Please enter a task, description, and select a date');
  }
}

function deleteAllTasks() {
  const taskList = document.getElementById('taskList');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  saveTasksToLocalStorage();
}

function checkIncompleteTasks() {
  const taskItems = document.querySelectorAll('.task-item');
  let numberOfIncompleteTasks = 0;
  taskItems.forEach(item => {
    if(!item.classList.contains('completed')){
      numberOfIncompleteTasks++;
    }
  });
  alert(`You have ${numberOfIncompleteTasks} incomplete tasks.`);
}

function addTaskToList(taskText, taskDescription, taskDate, completed) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (completed) {
    li.classList.add('completed');
  }

  li.innerHTML = `
    <input type="checkbox" onchange="toggleTaskCompletion(this)" ${completed ? 'checked' : ''}>
    <span>${taskDate}: ${taskText}</span>
    <span>${taskDescription}</span>
    <button onclick="removeTask(this)">Remove</button>
  `;

  taskList.appendChild(li);
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasksToLocalStorage();
}

function toggleTaskCompletion(checkbox) {
  const taskText = checkbox.nextElementSibling;
  const task = checkbox.parentElement;
  if (checkbox.checked) {
    taskText.classList.add('completed');
    task.classList.add('completed')
  } else {
    task.classList.remove('completed')
    taskText.classList.remove('completed');
  }
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(item => {
    let taskText = item.querySelector('span').innerText;
    const taskDescription = item.querySelectorAll('span')[1].innerText;
    const taskDate = taskText.split(': ')[0]; // Extract task date
    const completed = item.querySelector('span').classList.contains('completed');
    taskText = taskText.split(': ')[1]
    tasks.push({ taskText, taskDescription, taskDate, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function recoverTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    savedTasks.forEach(task => {
      addTaskToList(task.taskText, task.taskDescription, task.taskDate, task.completed);
    });
  }
}
window.onload=recoverTasksFromLocalStorage
