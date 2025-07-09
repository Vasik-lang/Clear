document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const ul = document.querySelector(".ul");
  const clearCompletedBtn = document.querySelector(".clear-completed-btn");

  // Счетчики
  const completedCount = document.querySelector(".completed-count");
  const totalCount = document.querySelector(".total-count");

  // Обновление счетчика задач
  function updateTaskCounter() {
    const totalTasks = ul.querySelectorAll(".li").length;
    const completedTasks = ul.querySelectorAll(".li.completed").length;

    completedCount.textContent = completedTasks;
    totalCount.textContent = totalTasks;
  }

  // Добавление задачи
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.querySelector(".input");
    const text = input.value.trim();

    if (!text) return;

    const li = document.createElement("li");
    li.className = "li";

    // Создаем текстовый элемент
    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    textSpan.className = "task-text";
    li.appendChild(textSpan);

    // Кнопка выполнения
    const doneBtn = document.createElement("button");
    doneBtn.className = "btn done-btn";
    doneBtn.dataset.action = "done";
    doneBtn.textContent = "Выполнено";
    li.appendChild(doneBtn);

    // Кнопка редактирования
    const editBtn = document.createElement("button");
    editBtn.className = "btn edit-btn";
    editBtn.dataset.action = "edit";
    editBtn.textContent = "Редактировать";
    li.appendChild(editBtn);

    // Кнопка удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete-btn";
    deleteBtn.dataset.action = "delete";
    deleteBtn.textContent = "Удалить";
    li.appendChild(deleteBtn);

    ul.prepend(li);
    input.value = "";

      updateTaskCounter();
  });

  // Обработчик событий для списка задач
  ul.addEventListener("click", (e) => {
    const target = e.target;
    const li = target.closest(".li");

    // Выполнение задачи
    if (target.dataset.action === "done") {
      li.classList.toggle("completed");

      if (li.classList.contains("completed")) {
        target.textContent = "Отменить";
        target.style.backgroundColor = "#28a745";
      } else {
        target.textContent = "Выполнено";
        target.style.backgroundColor = "";
      }

      updateTaskCounter();
    }

    // Редактирование задачи
    if (target.dataset.action === "edit") {
      const textSpan = li.querySelector(".task-text");
      const editBtn = target;

      if (editBtn.textContent === "Редактировать") {
        textSpan.contentEditable = true;
        textSpan.focus();
        editBtn.textContent = "Сохранить";
      } else {
        textSpan.contentEditable = false;
        editBtn.textContent = "Редактировать";

        textSpan.textContent = textSpan.textContent.trim();
      }
    }

    // Удаление задачи
    if (target.dataset.action === "delete") {
      li.remove();
      updateTaskCounter();

    }
  });

  // Удаление всех выполненных задач
  clearCompletedBtn.addEventListener("click", () => {
    const completedTasks = document.querySelectorAll(".li.completed");
    completedTasks.forEach((task) => task.remove());
    updateTaskCounter();

  });

  updateTaskCounter();
});