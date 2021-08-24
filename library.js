 
const form = document.querySelector("#book-form")
form.addEventListener("submit", e=>{
    e.preventDefault();
    const userInput = e.target[0].value
    console.log(userInput)
    form.reset();
})

const libraryButton = document.querySelector("#add-to-library");
libraryButton.addEventListener('click', e=>{
    libraryButton.innerText = "✓"
})

const favoriteButton = document.querySelector("#favorite")
favoriteButton.addEventListener('click', e=>{
    favoriteButton.innerText = "❤"
})

//export
import { yourAPIKey } from './config.js';
const title ='john adams'




const info = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=${yourAPIKey}`
fetch(info)
.then(resp => resp.json())
.then(data => {
    //console.log(data)
   console.log(data.items)
   renderBooks(data.items)
    })

function renderBooks(books){
    books.forEach(element => {
        // console.log(element)
        // console.log(element.volumeInfo.title)
        // console.log(element.volumeInfo.authors)
        // console.log(element.volumeInfo.description)
        // console.log(element.volumeInfo.imageLinks.thumbnail)
        const book = {
            title: element.volumeInfo.title,
            authors: element.volumeInfo.authors,
            description: element.volumeInfo.description,
            imageLinks: element.volumeInfo.imageLinks.thumbnail
        }
        console.log(book)
    });
}
console.log(info)