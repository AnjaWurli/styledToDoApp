let todos = [];

fetch("http://localhost:4730/todos")
  .then((response) => response.json())
  .then((data) => {
    todos = data;
    console.log(todos);
    data.forEach(render);
  });

//render entries:
function render(todo) {
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
}

//add new entry:
function addTodo(event) {
  event.preventDefault();
  let x = document.querySelector("#user-input").value;

  try {
    todos.forEach((todo) => {
      //for doublicated entries:
      if (x.toLowerCase() === todo.description.toLowerCase()) {
        throw new Error("double");
      }
    });

    if (x.length >= 5) {
      const newTodo = { description: x, done: false };
      fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((newTodoFromApi) => {
          render(newTodoFromApi);
          todos.push(newTodoFromApi);
          console.log(todos);
        });

      document.querySelector("#user-input").removeAttribute("style");
      event.target.reset(); //empty the input element
    } else {
      //for entries shorter than 5 characters
      throw new Error("short");
    }
  } catch (e) {
    if (e.message === "double") {
      alert("This To-Do is already there.");
    }
    if (e.message === "short") {
      alert("Your input is too short. Use at least 5 characters.");
    }
    document
      .querySelector("#user-input")
      .setAttribute("style", "outline: 2px solid red; color: red");
    console.log(e);
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
  let descr;
  for (let todo of todos) {
    if (event.target.id === `${todo.id}`) {
      descr = todo.description;
      todo.done = event.target.checked;
    }
  }
  const changedTodo = {
    description: descr,
    done: event.target.checked,
    id: event.target.id,
  };
  fetch(`http://localhost:4730/todos/${event.target.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(changedTodo),
  })
    .then((response) => response.json())
    .then((newTodoFromApi) => {
      console.log(newTodoFromApi);
    });
});

//remove done:
document.querySelector("#remove").addEventListener("click", () => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].done === true) {
      fetch(`http://localhost:4730/todos/${todos[i].id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then();
      todos.splice(i, 1);
    }
  }
  document.querySelector("#todo-list").innerHTML = "";
  todos.forEach(render);
});

//filter:
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
