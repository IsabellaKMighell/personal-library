const form = document.querySelector("#book-form")
form.addEventListener("submit", e=>{
    e.preventDefault();
    const userInput = e.target[0].value
    console.log(userInput)
    form.reset();
    const info = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInput}&key=${yourAPIKey}`
    fetch(info)
    .then(resp => resp.json())
    .then(data => {
    //console.log(data)
   console.log(data.items)
   renderBooks(data.items)
    })
})
// const libraryButton = document.querySelector("#add-to-library");
// libraryButton.addEventListener('click', e=>{
//     libraryButton.innerText = "✓"
//     favoriteDiv = document.querySelector("#favorite-books > div")
//     const bookTitle = document.querySelector("#detailed-info > p:nth-child(2) > span")
//     favoriteDiv.innerHTML = `<img src="queryselector" /> <div>queryselectTitle</div>`
// })
// const favoriteButton = document.querySelector("#favorite")
// favoriteButton.addEventListener('click', e=>{
//     favoriteButton.innerText = ":heart:"
// })
//export
import { yourAPIKey } from './config.js';
const title ='john adams'
function renderBooks(books){
    books.forEach(element => {
        const bookTitle = document.querySelector("#detailed-info > p:nth-child(2) > span")
        bookTitle.innerText = element.volumeInfo.title
        const bookImage = document.querySelector("#detailed-info > img")
        bookImage.src = element.volumeInfo.imageLinks.thumbnail
        const bookDes = document.querySelector("#detailed-info > p:nth-child(3)")
        bookDes.innerText = element.volumeInfo.description
        const book = {
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            imageLinks: element.volumeInfo.imageLinks.thumbnail
        }
        console.log(book)
        const libraryButton = document.querySelector("#add-to-library");
        libraryButton.addEventListener('click', e=>{
        libraryButton.innerText = "✓"
        // const addBooks = document.querySelector("#to-read")
        const libraryDiv = document.querySelector("#want-to-read")
        const newLibraryDiv = document.createElement('div')
        newLibraryDiv.innerHTML = `<img src=${book.imageLinks} /> <div>${book.title}</div>`
        // addBooks.append(libraryDiv)
        libraryDiv.appendChild(newLibraryDiv)
    });
        const favoriteButton = document.querySelector("#favorite")
        favoriteButton.addEventListener('click', e=>{
        favoriteButton.innerText = ":heart:"
        const favoriteDiv = document.querySelector("#favorite-books > div")
        // const
        favoriteDiv.innerHTML = `<img src=${book.imageLinks} /> <div>${book.title}</div>`
        addBooks.append(favoriteDiv)
})
    })
}