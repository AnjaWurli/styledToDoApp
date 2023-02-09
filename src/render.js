//render entries:
export function render(todo) {
  let liEl = document.createElement("li");
  let inputEl = document.createElement("input");
  let labelEl = document.createElement("label");

  liEl.setAttribute("class", `${todo.id} yours`);
  liEl.setAttribute("data-cy", `${todo.description}`);
  inputEl.setAttribute("type", "checkbox");
  inputEl.setAttribute("class", "todo");
  inputEl.setAttribute("data-cy", "checkbox");
  inputEl.setAttribute("id", todo.id);
  labelEl.setAttribute("for", todo.id);

  liEl.append(inputEl, labelEl);
  labelEl.appendChild(document.createTextNode(todo.description));
  document.querySelector("#todo-list").appendChild(liEl);

  if (todo.done === true) {
    inputEl.setAttribute("checked", "true");
  }
}
