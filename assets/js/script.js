const dialog = document.getElementById("dialog");
const addBtn = document.getElementById("addBook");
const form = document.getElementsByTagName("form")[0];
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const cancelBtn = document.getElementById("cancel");
const submitBtn = document.getElementById("submit");

const myLibrary = [];

addBtn.addEventListener("click", function () {
  dialog.showModal();
});

cancelBtn.addEventListener("click", function (event) {
  event.preventDefault();
  resetForm();
  dialog.close();
});

//SUBMIT VALIDATION
submitBtn.addEventListener("click", function () {
  if (
    titleInput.validity.valid &&
    authorInput.validity.valid &&
    pagesInput.validity.valid &&
    readInput.validity.valid
  ) {
    const book = new Book(
      titleInput.value,
      authorInput.value,
      parseInt(pagesInput.value),
      readInput.checked
    );
    addBookToLibrary(book);
    showBook();
    resetForm();
    dialog.close();
  }
});

//READ-NOTREAD BUTTON
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("readButton")) {
    const currentIndex = Array.from(
      event.target.parentNode.parentNode.children
    ).indexOf(event.target.parentNode);
    myLibrary[currentIndex].read = !myLibrary[currentIndex].read;

    if (myLibrary[currentIndex].read) {
      event.target.innerHTML = "✔ Read";
      event.target.className = "readButton true";
    } else {
      event.target.innerHTML = "✘ Not read";
      event.target.className = "readButton false";
    }
  }
});

//REMOVE CARD
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("removeButton")) {
    const cardToRemove = event.target.parentNode;
    const currentIndex = Array.from(cardToRemove.parentNode.children).indexOf(
      cardToRemove
    );

    cardToRemove.remove();

    myLibrary.splice(currentIndex, 1);
  }
});

//INPUTS USER VALIDATION
titleInput.addEventListener("input", function () {
  handleInputValidation(titleInput, "*This field is required");
});

authorInput.addEventListener("input", function () {
  handleInputValidation(authorInput, "*This field is required");
});

pagesInput.addEventListener("input", function () {
  handleInputValidation(pagesInput, "*This field is required");
});

form.addEventListener("submit", function (event) {
  if (!titleInput.validity.valid) {
    showError(
      document.querySelector("#title + .error"),
      "*This field is Required."
    );
    event.preventDefault();
  }
  if (!authorInput.validity.valid) {
    showError(
      document.querySelector("#author + .error"),
      "*This field is Required."
    );
    event.preventDefault();
  }
  if (!pagesInput.validity.valid) {
    showError(
      document.querySelector("#pages + .error"),
      "*This field is Required."
    );
    event.preventDefault();
  }
});

//BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//ADD BOOK CARD TO CONTAINER
function showBook() {
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");

  const titleBook = document.createElement("div");
  titleBook.classList.add("titleBook");
  titleBook.innerHTML = '"' + myLibrary[myLibrary.length - 1].title + '"';
  bookCard.appendChild(titleBook);

  const authorBook = document.createElement("div");
  authorBook.classList.add("authorBook");
  authorBook.innerHTML = myLibrary[myLibrary.length - 1].author;
  bookCard.appendChild(authorBook);

  const pagesBook = document.createElement("div");
  pagesBook.classList.add("pagesBook");
  pagesBook.innerHTML = myLibrary[myLibrary.length - 1].pages + " pages";
  bookCard.appendChild(pagesBook);

  const readBook = document.createElement("button");
  readBook.classList.add("readButton");

  if (myLibrary[myLibrary.length - 1].read) {
    readBook.innerHTML = "✔ Read";
    readBook.className = "readButton true";
    bookCard.appendChild(readBook);
  } else {
    readBook.innerHTML = "✘ Not read";
    readBook.className = "readButton false";
    bookCard.appendChild(readBook);
  }

  const removeBook = document.createElement("button");
  removeBook.classList.add("removeButton");
  removeBook.innerHTML = "Remove";
  bookCard.appendChild(removeBook);

  const cardContainer = document.querySelector(".card-container");
  cardContainer.appendChild(bookCard);
}

function resetForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

function showError(current, message) {
  current.textContent = message;
  current.className = "error";
}

function handleInputValidation(inputElement, errorMessage) {
  const errorMsj = document.querySelector(`#${inputElement.id} + .error`);

  if (inputElement.validity.valid) {
    errorMsj.innerHTML = "";
    errorMsj.className = "error";
  } else if (inputElement.validity.valueMissing) {
    showError(errorMsj, errorMessage);
  }
}
