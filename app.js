const form = document.querySelector(".form");
const ul = document.querySelector(".ul");

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

  //Кнопка выполнения
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
});

// Обработчик всех событий
ul.addEventListener('click', (e) => {
  const target = e.target;
  const li = target.closest('.li');

  //Выполнение
  if (target.dataset.action === 'done') {
    li.classList.toggle('completed');

    if (li.classList.contains('completed')) {
      target.textContent = 'Отменить';
      target.style.backgroundColor = '#28a745';
    } else {
      target.textContent = 'Выполнено';
      target.style.backgroundColor = '';
    }
  }

  // Редактирование
  if (target.dataset.action === 'edit') {
    const textSpan = li.querySelector('.task-text');
    const editBtn = target;

    // Переключаем режим редактирования
    if (editBtn.textContent === 'Редактировать') {
      textSpan.contentEditable = true;
      textSpan.focus();
      editBtn.textContent = 'Сохранить';
    } else {
      textSpan.contentEditable = false;
      editBtn.textContent = 'Редактировать';
    }
    
  // Удаление
  } else if (target.dataset.action === 'delete') {
    li.remove();
  }


  
});