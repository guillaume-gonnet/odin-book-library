const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () { return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}` };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
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
        console.log("book added to library:" + myLibrary.slice(-1).info);
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
    tableBody.appendChild(tr);
}

