function addTodo(event) {
  event.preventDefault();
  let x = document.querySelector("#user-input").value;

  //for multiple entries that are the same:
  let i = document.querySelectorAll(`.${x}`).length;
  let y = x + i;
  console.log(y);

  if (x.length >= 5) {
    let liEl = document.createElement("li");
    let inputEl = document.createElement("input");
    let labelEl = document.createElement("label");

    liEl.setAttribute("class", `${x} ${y} yours`);
    inputEl.setAttribute("type", "checkbox");
    inputEl.setAttribute("class", "todo");
    inputEl.setAttribute("id", y);
    labelEl.setAttribute("for", y);

    liEl.append(inputEl, labelEl);
    labelEl.appendChild(document.createTextNode(x));
    document.querySelector("#todo-list").appendChild(liEl);

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
  //the id of the checkbox is also the class of the list element we want to mark as "done":
  const liClass = event.target.id;
  document.querySelector(`.${liClass}`).classList.toggle("done");
  console.log(event.target.id);
});

//remove done:
document.querySelector("#remove").addEventListener("click", () => {
  const allDone = document.querySelectorAll(".done");
  allDone.forEach((done) => {
    console.log(done);
    done.remove();
  });
});

function filter(event) {
  console.log(event.target.id);
  const allDone = document.querySelectorAll(".done");
  const all = document.querySelectorAll(".yours");

  all.forEach((alls) => {
    alls.style.removeProperty("display");
  });
  if (event.target.id === "open") {
    allDone.forEach((done) => {
      done.style.setProperty("display", "none");
    });
  } else if (event.target.id === "done") {
    all.forEach((alls) => {
      if (!alls.getAttribute("class").includes("done")) {
        alls.style.setProperty("display", "none");
      }
    });
  }
}

document.querySelector("#filter-list").addEventListener("change", filter);
