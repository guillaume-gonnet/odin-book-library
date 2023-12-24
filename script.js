const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = null;
        this.info = function () { return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}` }
        this.toggleRead = function () { this.read = !this.read }
    }

    addBookToLibrary() {
        const id = myLibrary.length;
        this.id = id;
        myLibrary.push(this);
        console.log("book added to library:" + this.info());
        this.addBookToTable();
    }

    addBookToTable() {
        const bookInfo = ["title", "author", "pages", "read"];
        const tableBody = document.getElementById("bookTableBody");
        const tr = document.createElement("tr");

        for (let i = 0; i < bookInfo.length - 1; i++) {
            const td = document.createElement("td");
            td.innerText = this[bookInfo[i]];
            tr.appendChild(td);
        }
        //create button read
        const btnRead = document.createElement('button');
        btnRead.innerText = this.read ? "Read" : "Not Read";
        btnRead.setAttribute("class", this.read ? "read" : "not-read");
        btnRead.setAttribute('data-index-number', this.id);
        btnRead.addEventListener('click', (e) => {
            this.read ? btnRead.classList.replace("read", "not-read") : btnRead.classList.replace("not-read", "read");
            btnRead.innerText = this.read ? "Not Read" : "Read";
            this.toggleRead();
        });
        const tdBtnRead = document.createElement("td");
        tdBtnRead.appendChild(btnRead);
        tr.appendChild(tdBtnRead);

        //create button delete
        const btnDelete = document.createElement("button");
        btnDelete.innerText = "X";
        btnDelete.setAttribute("class", "cancelBtn");
        btnDelete.setAttribute('data-index-number', this.id);
        btnDelete.addEventListener('click', (e) => {
            this.deleteBook(parseInt(btnDelete.dataset.indexNumber));
        });

        tr.appendChild(btnDelete);

        tr.setAttribute('id', "book" + this.id);

        tableBody.appendChild(tr);
    }

    deleteBook(index) {
        let bookRow = document.getElementById('book' + index);
        bookRow.parentNode.removeChild(bookRow);
        let indexBook = myLibrary.findIndex(book => book.id === this.id);
        myLibrary.splice(indexBook, 1);
    }
}

const book1 = new Book("title1", "author1", "1", true);
const book2 = new Book("title2", "author2", "2", true);
const book3 = new Book("title3", "author3", "3", false);


//Sample data
book1.addBookToLibrary();
book2.addBookToLibrary();
book3.addBookToLibrary();

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
        newBook.addBookToLibrary();
        newBookDialog.close();
    });
});