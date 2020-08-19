const booksUrl = "http://localhost:3000/books"
let bookCollection = document.querySelector("#book-collection")

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})


const fetchData = () => {
    fetch(booksUrl)
    .then(res => res.json())
    .then(bookArr => {
        bookArr.forEach(book => {
            renderBook(book)
        });
    })
}

const renderBook = (book) =>{
    const bookDiv = document.createElement("div")
    const bookTitle = document.createElement("h2")
    const bookAuthor = document.createElement("p")
    const bookGenre = document.createElement("p")
    const bookLikes = document.createElement("p")
    const bookCover = document.createElement("img")

    bookDiv.classList.add("book-card")
    bookDiv.id = book.id

    bookTitle.innerText = book.title
    bookAuthor.innerText = book.author
    bookGenre.innerText = book.genre

    bookDiv.append(bookTitle)
    bookDiv.append(bookAuthor)
    bookDiv.append(bookGenre)
    bookDiv.append(bookLikes)
    bookDiv.append(bookCover)
    bookCollection.append(bookDiv)

}

// const renderToons = (toon) => {
//     const toonSpan = document.createElement("span")
//     const toonName = document.createElement("h2")

//     toonSpan.addEventListener("click", () =>{
//         divName.innerText = toon.name
//         divImage.src = toon.image
//         divSpan.innerText = toon.calories
//         formToonID.value = toon.id
//       })

//     toonSpan.innerText = toon.name
//     toonSpan.append(toonName)
//     toonBar.append(toonSpan)
    
// }



{/* <div class="card">
<h2>Woody</h2>
<img src=toy_image_url class="toy-avatar" />
<p>4 Likes </p>
<button class="like-btn">Like <3</button>
</div> */}