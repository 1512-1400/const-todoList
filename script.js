var $ = document;
var input = $.querySelector(`.input`);
var todoList = $.querySelector(`.rightAbsoluteContainer`);
var ok = $.querySelector(`.btn`);
var noteArray = [];

if (JSON.parse(localStorage.getItem(`todos`))) {
  noteArray = JSON.parse(localStorage.getItem(`todos`));
} else {
  noteArray = [];
}

function addNote(element, status = false) {
  var newTodo = $.createElement(`div`);

  var todoName = $.createElement(`span`);
  todoName.innerHTML = element.name;

  var compalteBtn = $.createElement(`span`);
  compalteBtn.className = `compalte cursor-pointer w-20 h-8 bg-green-700 flex justify-center items-center text-xs rounded mx-2`;
  
  if (status) {
    newTodo.className = `compitedTodo w-11/12 h-10 my-2 rounded-lg bg-white flex justify-between items-center px-10 text-md text-black`;
    todoName.className = `line`;
    compalteBtn.innerHTML = `uncomplate`;
  } else {
    newTodo.className = `w-11/12 h-10 my-2 rounded-lg bg-white flex justify-between items-center px-10 text-md text-black`;
    todoName.className = ``;
    compalteBtn.innerHTML = `complate`;
  }

  var btnsContainer = $.createElement(`span`);
  btnsContainer.className = `w-1/3 flex`;


  var deleteBtn = $.createElement(`span`);
  deleteBtn.className = `delete cursor-pointer w-20 h-8 bg-red-600 flex justify-center items-center text-xs rounded`;
  deleteBtn.innerHTML = `delete`;

  newTodo.append(todoName);
  btnsContainer.append(compalteBtn, deleteBtn);
  newTodo.append(btnsContainer);
  todoList.append(newTodo);

  deleteBtn.addEventListener(`click`, (event) => {
    var indexOfDeletedTodo = noteArray.findIndex((item) => {
      return (
        item.name ==
        event.target.parentElement.parentElement.firstElementChild.innerHTML
      );
    });
    noteArray.splice(indexOfDeletedTodo, 1);
    localStorage.setItem(`todos`, JSON.stringify(noteArray));
    todoList.innerHTML = ``;
    noteArray.forEach((item) => {
      addNote(item, item.status);
    });
  });

  compalteBtn.addEventListener(`click`, (event) => {
    var indexOfComplatedTodo = noteArray.findIndex((item) => {
      return (
        item.name ==
        event.target.parentElement.parentElement.firstElementChild.innerHTML
      );
    });
    if (noteArray[indexOfComplatedTodo].status == false) {
      noteArray[indexOfComplatedTodo].status = true;
      localStorage.setItem(`todos`, JSON.stringify(noteArray));
      event.target.parentElement.parentElement.className = `compitedTodo w-11/12 h-10 my-2 rounded-lg bg-white flex justify-between items-center px-10 text-md text-black`;
      event.target.parentElement.parentElement.firstElementChild.className = `line`;
    todoList.innerHTML = ``;
      noteArray.forEach((item) => {
        addNote(item, item.status);
      });
    } else {
      noteArray[indexOfComplatedTodo].status = false;
      localStorage.setItem(`todos`, JSON.stringify(noteArray));
      event.target.parentElement.parentElement.className = `w-11/12 h-10 my-2 rounded-lg bg-white flex justify-between items-center px-10 text-md text-black`;
      event.target.parentElement.parentElement.firstElementChild.className = ``;
    todoList.innerHTML = ``;
      noteArray.forEach((item) => {
        addNote(item, item.status);
      });
    }
  });
}

window.addEventListener(`load`, () => {
  input.focus();
  todoList.innerHTML = ``;
  noteArray.forEach((item) => {
    addNote(item, item.status);
  });
});

function saveNote() {
  noteArray.push({ name: input.value, status: false });
  localStorage.setItem(`todos`, JSON.stringify(noteArray));
  todoList.innerHTML = ``;
  noteArray.forEach((item) => {
    addNote(item, item.status);
  });
}

function deleteNote() {
  localStorage.clear();
}

input.addEventListener(`keyup`, (key) => {
  if (key.keyCode == 13) {
    saveNote();
    input.value = ``;
  }
});

ok.addEventListener(`click`, () => {
  saveNote();
  input.value = ``;
  input.focus();
});
