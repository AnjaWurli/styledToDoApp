const state = {
  todos: [{ description: "Put your Todos here", done: false, id: "0" }],
};
console.log(state);

// Local Storage
function updateLocalStorage() {
  const userUptodo = localStorage.setItem(
    "userUptodo",
    JSON.stringify(state.todos)
  );
}
function loadLocalStorage() {
  if (
    localStorage.getItem("userUptodo") !== "[]" &&
    localStorage.getItem("userUptodo")
  ) {
    //Local storage file is there and is not empty (after deleting all entries)
    const userDownToDo = JSON.parse(localStorage.getItem("userUptodo"));
    state.todos = userDownToDo;
    console.log(localStorage.getItem("userUptodo"));
  } else {
    updateLocalStorage();
  }
}

//render entries:
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
    updateLocalStorage();
  });
}

//init:
loadLocalStorage();
render();

//add new entry:
function addTodo(event) {
  event.preventDefault();
  let x = document.querySelector("#user-input").value;
  let y;

  if (!state.todos[0]) {
    //if no entry in state
    y = 1;
  } else {
    y = +state.todos[state.todos.length - 1].id + 1;
  }

  try {
    state.todos.forEach((todo) => {
      //for doublicated entries:
      if (x.toLowerCase() === todo.description.toLowerCase()) {
        throw new Error("double");
      }
    });

    if (x.length >= 5) {
      //state={todos:[{},{},...]}
      state.todos.push({ description: `${x}`, done: `false`, id: `${y}` });

      render();

      document.querySelector("#user-input").removeAttribute("style");
      event.target.reset();
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
  state.todos.forEach((todo) => {
    if (todo.id === event.target.id) {
      todo.done = event.target.checked;
      updateLocalStorage();
    }
  });
});

//remove done:
document.querySelector("#remove").addEventListener("click", () => {
  for (let i = state.todos.length - 1; i >= 0; i--) {
    if (state.todos[i].done === true) {
      state.todos.splice(i, 1);
    }
  }
  render();
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
