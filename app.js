const form = document.querySelector(".form");
const ul = document.querySelector(".ul");

form.addEventListener("submit", toDo);

function toDo(e) {
  e.preventDefault();

  let input = document.querySelector(".input");
  let inputText = input.value;

  let li = document.createElement("li");
  li.className = "li";
  let textNode = document.createTextNode(inputText);
  li.appendChild(textNode);

  // Создаем кнопку удалить

  let deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  deleteBtn.className = "btn";
  deleteBtn.dataset.action = "delete";

  li.appendChild(deleteBtn);

  ul.prepend(li);

  input.value = "";
}

// Производим удаление

ul.addEventListener("click", removeLi);

function removeLi(e) {
  e.target.hasAttribute("data-action") &&
  e.target.getAttribute("data-action") == "delete"
    ? e.target.parentNode.remove()
    : "";
}
