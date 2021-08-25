import { yourAPIKey } from './config.js';
const title ='john adams'

const form = document.querySelector("#book-form")
form.addEventListener("submit", e=>{
    e.preventDefault();
    const userInput = e.target[0].value
    //console.log(userInput)
    form.reset();
    const info = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInput}&key=${yourAPIKey}`
    fetch(info)
    .then(resp => resp.json())
    .then(data => {
    //console.log(data)
   //console.log(data.items)
   renderBooks(data.items)
    })
})



function renderBooks(books){
    books.forEach(element => {
         const book = {
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            imageLinks: element.volumeInfo.imageLinks.thumbnail
        }
        //console.log(book)
        const bookList = document.querySelector('.book-display')
        //console.log(bookList)
        const detailedInfo = document.createElement('div')
        detailedInfo.id = 'detailed-info'

        
        //image element
        const img = document.createElement('img')
        img.src = book.imageLinks

        //buttons and book title
        const buttonsAndTitle = document.createElement('div')

        const libraryButton = document.createElement('button')
        libraryButton.innerText = "▻"
        libraryButton.id = "add-to-library"

        const bookTitleElement = document.createElement('span')
        bookTitleElement.innerText = book.title

        const faveButton = document.createElement('button')
        faveButton.innerText = '♡'
        faveButton.id = "favorite"

        buttonsAndTitle.append(libraryButton, bookTitleElement, faveButton)
        

        const imgTitleDiv = document.createElement('div')
        imgTitleDiv.append(img, buttonsAndTitle)
        
        


        //book description
        const bookDescription = document.createElement('div')
        bookDescription.innerText = book.description
        
    

        detailedInfo.append(imgTitleDiv ,bookDescription)
        detailedInfo.style.display = "flex"
        detailedInfo.style.padding = '10px'

        bookList.appendChild(detailedInfo)

       libraryButton.addEventListener('click',  e=>{
            addToRead(book)
            //postToJsonLibrary(book)
       })
       

       faveButton.addEventListener('click', e=>{
            addToFavorite(book)
            //postToJsonFavorites(book)
        })

    })
}

function addToRead(book){
    console.log(`clicked addToLibrary     ${book.title}`)
    const wantToRead = document.querySelector('#want-to-read')
    const toRead = document.createElement('div')
    toRead.id = 'to-read'
    toRead.innerHTML = `<img src=${book.imageLinks} /> <div>${book.title}</div>`
    wantToRead.appendChild(toRead)


}
function addToFavorite(book){
    console.log(`clicked favorite     ${book.title}`)
    const favoriteBooks = document.querySelector('#favorite-books')
    const faves = document.createElement('div')
    faves.id = 'faves'
    faves.innerHTML = `<img src=${book.imageLinks} /> <div>${book.title}</div>`
    favoriteBooks.appendChild(faves)
}

/*
function postToJsonLibrary(book){
    fetch("http://localhost:3000/library", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(book)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

function postToJsonFavorites(book){
    fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(book)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}*/