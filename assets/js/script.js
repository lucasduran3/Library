class Book {
  #title;
  #author;
  #pages;
  #readed;

  constructor(title, author, pages, readed) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#readed = readed;
  }

  set title(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  set author(author) {
    this.#author = author;
  }

  get author() {
    return this.#author;
  }

  set pages(pages) {
    this.#pages = pages;
  }

  get pages() {
    return this.#pages;
  }

  set readed(readed) {
    this.#readed = readed;
  }

  get readed() {
    return this.#readed;
  }
}

class Library {
  #books = [];

  addBook(book) {
    this.#books.push(book);
  }

  deleteBook(index) {
    this.#books.splice(index, 1);
  }

  get books() {
    return this.#books;
  }
}

class ScreenController {
  #library;
  #books;

  #addBtn;
  #cardContainer;
  #titleInput;
  #authorInput;
  #pagesInput;
  #readInput;
  #submitBtn;
  #cancelBtn;
  #form;
  #dialog;
  #userInputs;

  constructor() {
    this.#library = new Library();
    this.#books = this.#library.books;

    this.#dialog = document.querySelector("dialog");
    this.#addBtn = document.querySelector("#addBook");
    this.#cardContainer = document.querySelector(".card-container");
    this.#titleInput = document.querySelector("#title");
    this.#authorInput = document.querySelector("#author");
    this.#pagesInput = document.querySelector("#pages");
    this.#readInput = document.querySelector("#read");
    this.#submitBtn = document.querySelector("#submit");
    this.#cancelBtn = document.querySelector("#cancel");
    this.#form = document.getElementsByTagName("form")[0];

    this.#userInputs = [this.#titleInput, this.#authorInput, this.#pagesInput];
  }

  init() {
    this.setupEventListeners();
  }

  updateScreen() {
    this.#cardContainer.innerHTML = "";

    this.#books.forEach((book, bookIndex) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("card");

      const titleBook = document.createElement("div");
      titleBook.classList.add("titleBook");
      titleBook.innerHTML = '"' + book.title + '"';
      bookCard.appendChild(titleBook);

      const authorBook = document.createElement("div");
      authorBook.classList.add("authorBook");
      authorBook.innerHTML = book.author;
      bookCard.appendChild(authorBook);

      const pagesBook = document.createElement("div");
      pagesBook.classList.add("pagesBook");
      pagesBook.innerHTML = book.pages + " pages";
      bookCard.appendChild(pagesBook);

      const readBook = document.createElement("button");
      readBook.classList.add("readButton");

      if (book.readed) {
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

      bookCard.dataset.index = bookIndex;

      this.#cardContainer.appendChild(bookCard);
    });
  }

  clickAddBook() {
    const book = new Book(
      this.#titleInput.value,
      this.#authorInput.value,
      this.#pagesInput.value,
      this.#readInput.checked
    );

    this.#library.addBook(book);

    this.updateScreen();
  }

  clickReadBook(e) {
    if (e.target.classList.contains("readButton")) {
      const selectedCard = e.target.parentNode.dataset.index;

      this.#books[selectedCard].readed = !this.#books[selectedCard].readed;
      this.updateScreen();
    }
  }

  clickRemoveBook(e) {
    if (e.target.classList.contains("removeButton")) {
      const selectedCard = e.target.parentNode.dataset.index;
      this.#library.deleteBook(selectedCard);
      this.updateScreen();
    }
  }

  setupEventListeners() {
    this.#submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.submitValidation(e);
    });

    this.#addBtn.addEventListener("click", () => this.#dialog.showModal());

    this.#cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.#dialog.close();
      this.#form.reset();
    });

    document.addEventListener("click", (e) => {
      this.clickRemoveBook(e);
    });

    document.addEventListener("click", (e) => {
      this.clickReadBook(e);
    });

    this.inputsValidation();
  }

  submitValidation(e) {
    if (
      this.#titleInput.validity.valid &&
      this.#authorInput.validity.valid &&
      this.#pagesInput.validity.valid
    ) {
      this.clickAddBook();
      this.#dialog.close();
      this.#form.reset();
    } else {
      this.showError();
      e.preventDefault();
    }
  }

  inputsValidation() {
    this.#userInputs.forEach((element) => {
      element.addEventListener("input", () => {
        let errorMsj = document.querySelector(`#${element.id} + .error`);
        if (element.validity.valid) {
          errorMsj.innerHTML = "";
          errorMsj.className = "error";
        } else if (element.validity.valueMissing) {
          errorMsj.textContent = "This field is Required.";
          errorMsj.className = "error";
        }
      });
    });
  }

  showError() {
    this.#userInputs.forEach((element) => {
      if (!element.validity.valid) {
        let errorMsj = document.querySelector(`#${element.id} + .error`);
        errorMsj.textContent = "This field is Required.";
        errorMsj.className = "error";
      }
    });
  }
}

const screenController = new ScreenController();
screenController.init();
