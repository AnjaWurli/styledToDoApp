const state = {
  todos: [
    { description: "Learn HTML", done: true, id: "1" },
    { description: "Learn CSS", done: false, id: "2" },
    { description: "Learn Javascript", done: false, id: "3" },
  ],
};
render();

function render() {
  document.querySelector("#todo-list").innerHTML = "";
  state.todos.forEach((todo) => {
    let liEl = document.createElement("li");
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("label");

    liEl.setAttribute("class", `${todo.id} yours`);
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("class", "todo");
    inputEl.setAttribute("id", todo.id);
    labelEl.setAttribute("for", todo.id);

    liEl.append(inputEl, labelEl);
    labelEl.appendChild(document.createTextNode(todo.description));
    document.querySelector("#todo-list").appendChild(liEl);

    if (todo.done === true) {
      inputEl.setAttribute("checked", "true");
    }
  });
}

function addTodo(event) {
  event.preventDefault();
  let x = document.querySelector("#user-input").value;

  let y = +state.todos[state.todos.length - 1].id + 1;

  if (x.length >= 5) {
    //state={todos:[{},{},...]}
    state.todos.push({ description: `${x}`, done: `false`, id: `${y}` });

    render();

    document.querySelector("#user-input").removeAttribute("style");
  } else {
    document
      .querySelector("#user-input")
      .setAttribute("style", "outline: 2px solid red; color: red");
  }
}

//add new Todo:
document.addEventListener("submit", addTodo);
//add new Todo with Enter:
document.querySelector("input").addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    addTodo();
  }
});

//mark as done:
document.querySelector("#todo-list").addEventListener("change", (event) => {
  state.todos.forEach((todo) => {
    if (todo.id === event.target.id) {
      todo.done = event.target.checked;
    }
  });
});

//remove done:
document.querySelector("#remove").addEventListener("click", () => {
  for (let i = 0; i < state.todos.length; i++) {
    if (state.todos[i].done === true) {
      state.todos.splice(i, 1);
    }
  }
  render();
});

function filter(event) {
  const allTodo = document.querySelectorAll(".todo");

  allTodo.forEach((all) => {
    if (event.target.id === "open" && all.checked) {
      all.parentElement.style.setProperty("display", "none");
    } else if (event.target.id === "done" && !all.checked) {
      all.parentElement.style.setProperty("display", "none");
    } else {
      all.parentElement.style.removeProperty("display");
    }
  });
}

document.querySelector("#filter-list").addEventListener("change", filter);
