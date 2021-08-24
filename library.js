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
        console.log(element)
        console.log(element.volumeInfo.title)
        console.log(element.volumeInfo.authors)
        console.log(element.volumeInfo.description)
        console.log(element.volumeInfo.imageLinks.thumbnail)
        
    });
}
console.log(info)