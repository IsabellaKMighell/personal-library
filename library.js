import { yourAPIKey } from "./config.js";
const title = "john adams";
const bookIdListRead = [];
const bookIdListFave = [];

const form = document.querySelector("#book-form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const userInput = e.target[0].value;
	//console.log(userInput)
	document.querySelector(".book-display").innerHTML = "";
	form.reset();

	const info = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInput}&key=${yourAPIKey}`;
	fetch(info)
		.then((resp) => resp.json())
		.then((data) => {
			//console.log(data)
			//console.log(data.items)
			renderBooks(data.items);
		});

	const background = document.querySelector(".book-display");
	background.style.padding = "10px";
});

function renderBooks(books) {
	books.forEach((element) => {
		//console.log(element)
		const book = {
			title: element.volumeInfo.title,
			authors: element.volumeInfo.authors,
			description: element.volumeInfo.description,
			imageLinks: element.volumeInfo.imageLinks.thumbnail,
			bookID: element.id,
		};
		console.log(book);
		const bookList = document.querySelector(".book-display");
		//console.log(bookList)
		const detailedInfo = document.createElement("div");
		detailedInfo.className = "detailed-info";

		//image element
		const img = document.createElement("img");
		img.src = book.imageLinks;

		//buttons and book title
		const buttonsAndTitle = document.createElement("div");

		const bookTitleElement = document.createElement("p");
		bookTitleElement.innerText = book.title;
		bookTitleElement.id = "bookTitle";

		const libraryButton = document.createElement("button");
		libraryButton.innerHTML = `<span>▻</span>`;
		libraryButton.className = "add-to-library";
		//libraryButton.style.padding = "5px";

		const faveButton = document.createElement("button");
		faveButton.innerText = "♡";
		faveButton.className = "favorite";
		//faveButton.style.padding= '5px'

		buttonsAndTitle.append(bookTitleElement, libraryButton, faveButton);

		const imgTitleDiv = document.createElement("div");
		//imgTitleDiv.style.padding = "10px";
		imgTitleDiv.style.width = "148px";
		imgTitleDiv.append(img, buttonsAndTitle);

		//book description
		const bookDescription = document.createElement("div");
		bookDescription.innerHTML = `<b>Description:</b> ${book.description}`;
		bookDescription.className = "description";
		//bookDescription.style.textAlign = "left";
		//bookDescription.style.paddingTop = "10px";

		detailedInfo.append(imgTitleDiv, bookDescription);
		//detailedInfo.style.display = "flex";
		//detailedInfo.style.padding = "10px";

		bookList.appendChild(detailedInfo);

		libraryButton.addEventListener("click", (e) => {
			const bookisinlist = bookIdListRead.includes(book.bookID);
			if (bookisinlist === true) {
				alert(`${book.title} is already on the Books to Read list`);
			} else {
				bookIdListRead.push(book.bookID);
				libraryButton.innerText = "✓";

				addToRead(book);

				fetch("http://localhost:3000/library", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(book),
				});
			}
		});

		faveButton.addEventListener("click", (e) => {
			const bookisinlistFave = bookIdListFave.includes(book.bookID);
			if (bookisinlistFave === true) {
				alert(`${book.title} is already on the Favorite Book list`);
			} else {
				bookIdListFave.push(book.bookID);
				faveButton.innerText = "❤";

				addToFavorite(book);

				fetch("http://localhost:3000/favorites", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(book),
				});
			}
		});
	});
}

//Want to read library
fetch("http://localhost:3000/library")
	.then((resp) => resp.json())
	.then((books) =>
		books.forEach((book) => {
			bookIdListRead.push(book.bookID);
			addToRead(book);
		})
	);

function addToRead(book) {
	//console.log(`clicked addToLibrary     ${book.title}`)
	const wantToReadFlexContainer = document.querySelector("#to-read");
	const toRead = document.createElement("div");
	toRead.className = "wants";

	const img = document.createElement("img");
	img.src = book.imageLinks;
	const title = document.createElement("div");
	title.innerText = book.title;

	const deleteButton = document.createElement("button");
	deleteButton.innerText = "x";
	deleteButton.className = "all-buttons";

	toRead.append(img, title, deleteButton);
	//toRead.style.padding = "5px";

	wantToReadFlexContainer.appendChild(toRead);
	wantToReadFlexContainer.style.display = "flex";

	deleteButton.addEventListener("click", (e) =>
		removeLibrary(e, book, toRead)
	);
}

//Favorites Library
fetch("http://localhost:3000/favorites")
	.then((resp) => resp.json())
	.then((books) =>
		books.forEach((book) => {
			bookIdListFave.push(book.bookID);
			addToFavorite(book);
		})
	);

function addToFavorite(book) {
	//console.log(`clicked favorite     ${book.title}`)
	const favoritesFlexContainer = document.querySelector("#faves");
	const faves = document.createElement("div");
	faves.className = "favorites";

	const img = document.createElement("img");
	img.src = book.imageLinks;
	const title = document.createElement("div");
	title.innerText = book.title;

	const deleteButton = document.createElement("button");
	deleteButton.innerText = "x";
	deleteButton.className = "all-buttons";

	faves.append(img, title, deleteButton);
	//faves.style.padding = "5px";

	favoritesFlexContainer.appendChild(faves);
	favoritesFlexContainer.style.display = "flex";

	deleteButton.addEventListener("click", (e) =>
		removeFavorite(e, book, faves)
	);
}

function removeLibrary(e, book, toRead) {
	toRead.remove();

	fetch(`http://localhost:3000/library/${book.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": `application/json`,
		},
	})
		.then((resp) => resp.json())
		.then((data) => console.log(data));
}

function removeFavorite(e, book, faves) {
	faves.remove();

	fetch(`http://localhost:3000/favorites/${book.id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": `application/json`,
		},
	})
		.then((resp) => resp.json())
		.then((data) => console.log(data));
}
