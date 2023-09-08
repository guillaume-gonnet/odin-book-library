const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = null;
    this.info = function () { return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}` };
}

function addBookToLibrary(book) {
    const id = myLibrary.length;
    book.id = id;
    myLibrary.push(book);
    console.log("book added to library:" + book.info());
    addBookToTable(book);
}

const book1 = new Book("title1", "author1", "1", "true");
const book2 = new Book("title2", "author2", "2", "true");
const book3 = new Book("title3", "author3", "3", "false");


//Sample data
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

//manage modal for new book
const newBookBtn = document.getElementById("newBookBtn");
const newBookDialog = document.getElementById('newBookDialog');
const newBookTitle = document.getElementById('newBookTitle');
const newBookAuthor = document.getElementById('newBookAuthor');
const newBookPages = document.getElementById('newBookPages');
const newBookRead = document.getElementById('newBookRead');

newBookBtn.addEventListener('click', () => {
    newBookDialog.showModal();
    const newBookConfirmBtn = newBookDialog.querySelector('#newBookConfirmBtn');
    newBookConfirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const newBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked);
        addBookToLibrary(newBook);
        newBookDialog.close();
    });
});

function addBookToTable(book) {
    const bookInfo = ["title", "author", "pages", "read"];
    const tableBody = document.getElementById("bookTableBody");
    const tr = document.createElement("tr");

    for (let i = 0; i < bookInfo.length; i++) {
        const td = document.createElement("td");
        td.innerText = book[bookInfo[i]];
        tr.appendChild(td);
    }

    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.setAttribute("class", "cancelBtn");
    btn.setAttribute('data-index-number', book.id);
    btn.addEventListener('click', (e) => {
        deleteBook(parseInt(btn.dataset.indexNumber));
    });

    tr.appendChild(btn);
    tr.setAttribute('id', "book" + book.id);

    tableBody.appendChild(tr);
}

function deleteBook(bookId) {
    bookRow = document.getElementById('book' + bookId);
    bookRow.parentNode.removeChild(bookRow);
    let indexBook = myLibrary.findIndex(book => book.id === bookId);
    myLibrary.splice(indexBook, 1);
}