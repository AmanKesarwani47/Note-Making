// console.log("this is a console of app.js");
showNotes();

// Add EventListener
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("AppNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (addTxt.value.length != "") {
    notesObj.push(addTxt.value);
    localStorage.setItem("AppNotes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
  } else {
    let alertShow = document.getElementById("showalert");
    alertShow.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Message: </strong> Please add some text to make a note.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
      `;
      setTimeout(() => {
          alertShow.innerHTML = "";
      }, 1500);
  }
  //   console.log(notesObj);
});

function showNotes() {
  let notes = localStorage.getItem("AppNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="noteCard m-2 card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
      </div>
        `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML =
      "Their's nothing to show! Use 'Add a note' section to add a note";
  }
}

// Function for deleting a note

function deleteNote(index) {
  // console.log("I am deleting"+index);
  let notes = localStorage.getItem("AppNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("AppNotes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let searchVal = search.value.toLowerCase();
  // console.log("Input Event Fired"+searchVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(searchVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
