var taskInput = document.querySelector(".add-task__input");
var addButton = document.querySelector(".add-button");
var incompleteTaskHolder = document.querySelector(".todo__list");
var completedTasksHolder = document.querySelector(".completed-tasks__list");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.classList.add("todo__list-item", "list-item");

  label.innerText = taskString;
  label.className = "list-item__label";

  checkBox.type = "checkbox";
  editInput.type = "text";
  checkBox.classList.add("list-item__checkbox");
  editInput.classList.add("list-item__input", "input");

  editButton.innerText = "Edit";
  editButton.classList.add("edit-btn", "button");

  deleteButton.classList.add("delete-btn", "button");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("delete-btn__icon")
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

var addTask = function () {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".list-item__input");
  var label = listItem.querySelector(".list-item__label");
  var editBtn = listItem.querySelector(".edit-btn");
  var containsClass = listItem.classList.contains("edit");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode

  ul.removeChild(listItem);
};


var taskCompleted = function () {
  var listItem = this.parentNode;
  var taskLabel = listItem.querySelector(".list-item__label");

  taskLabel.classList.add("completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  var taskLabel = listItem.querySelector(".list-item__label");
  taskLabel.classList.remove("completed");
  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".list-item__checkbox");
  var editButton = taskListItem.querySelector(".edit-btn");
  var deleteButton = taskListItem.querySelector(".delete-btn");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

