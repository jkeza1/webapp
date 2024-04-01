const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const taskDescriptionInput = document.getElementById('taskDescriptionInput');

function addTask() {
  const taskText = taskNameInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();
  if (taskText && taskDescription !== '') {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
      <input type="checkbox" onchange="toggleTaskCompletion(this)">
      <span>${taskText}</span>
      <span>${taskDescription}</span>
      <button onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
    taskNameInput.value = '';
    taskDescriptionInput.value = '';
  } else {
    alert('Please enter a task and description');
  }
}

function toggleTaskCompletion(checkbox) {
  const taskText = checkbox.nextElementSibling;
  if (checkbox.checked) {
    taskText.classList.add('completed');
  } else {
    taskText.classList.remove('completed');
  }
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
