const title = 'the+lord+of+the+rings'.toLowerCase()
const title1 ='A_Dance_with_Dragons'.toLowerCase()

fetch(`http://openlibrary.org/search.json?q=${title1}`)
.then(resp => resp.json())
.then(data => {
    console.log(data.docs[0].title)
    console.log(data.docs)
    })






// fetch(`http://covers.openlibrary.org/b/id/240727-S.jpg`)
// .then(resp => resp.json())
// .then(data => console.log(data))