import { yourAPIKey } from './config.js';
const title ='john adams'
const bookIdListRead = []
const bookIdListFave = []

const form = document.querySelector("#book-form")
form.addEventListener("submit", e=>{
    e.preventDefault();
    const userInput = e.target[0].value
    //console.log(userInput)
    document.querySelector('.book-display').innerHTML = ''
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
        //console.log(element)
         const book = {
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            imageLinks: element.volumeInfo.imageLinks.thumbnail,
            bookID: element.id
        }
        console.log(book)
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
            const bookisinlist = bookIdListRead.includes(book.bookID)
            if (bookisinlist === true) {
                alert('This is a Double Read')
            } else {
                bookIdListRead.push(book.bookID)
                libraryButton.innerText='✓'

                addToRead(book)

                fetch("http://localhost:3000/library", {
                method: "POST",
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(book)
                })
                
            }

        })
       

        faveButton.addEventListener('click', e=>{
            const bookisinlistFave = bookIdListFave.includes(book.bookID)
            if (bookisinlistFave === true) {
                alert('This is a Double Fave')
            } else {
                bookIdListFave.push(book.bookID)
                faveButton.innerText = '❤'

                addToFavorite(book)

                fetch("http://localhost:3000/favorites", {
                method: "POST",
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify(book)
                })
            }
        
        })

    })
}



fetch("http://localhost:3000/library")
    .then(resp => resp.json())
    .then(books => books.forEach(book=> {
        bookIdListRead.push(book.bookID)
        addToRead(book)
    }))

function addToRead(book){
    //console.log(`clicked addToLibrary     ${book.title}`)
    const wantToReadFlexContainer = document.querySelector("#to-read")
    const toRead = document.createElement('div')
    toRead.className = 'wants'

    const img = document.createElement('img')
    img.src = book.imageLinks
    const title = document.createElement('div')
    title.innerText = book.title

    toRead.append(img,title)
    toRead.style.padding = "5px"

    wantToReadFlexContainer.appendChild(toRead)
    wantToReadFlexContainer.style.display = "flex"



}

fetch("http://localhost:3000/favorites")
    .then(resp => resp.json())
    .then(books => books.forEach(book=> {
        bookIdListFave.push(book.bookID)
        addToFavorite(book)
    }))

function addToFavorite(book){
    //console.log(`clicked favorite     ${book.title}`)
    const favoritesFlexContainer = document.querySelector("#faves")
    const faves = document.createElement('div')
    faves.className = "favorites"
    
    const img = document.createElement('img')
    img.src = book.imageLinks
    const title = document.createElement('div')
    title.innerText = book.title

    faves.append(img,title)
    faves.style.padding = "5px"

    favoritesFlexContainer.appendChild(faves)
    favoritesFlexContainer.style.display="flex"
}

