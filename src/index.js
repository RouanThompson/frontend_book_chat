const booksUrl = "http://localhost:3000/books"
const sideBarDiv = document.querySelector("#sidebar")
const bookCollection = document.querySelector("#book-collection")
const bookRow = document.querySelector(".row")

//treating it as my main
document.addEventListener('DOMContentLoaded', () => {
    loginForm()
})
//


let loginForm = () => {

    clear(sideBarDiv)

    //initialize variables with tags
    let loginForm = document.createElement("form")
    let usernameDiv = document.createElement('div')
    let usernameLabel = document.createElement("label")
    let usernameInput = document.createElement("input")
    let submitButton = document.createElement('button')
    //

    //add class
    loginForm.classList.add("centered")
    //

    //assign
    usernameDiv.className = "form-group"
    usernameLabel.htmlFor = "username"
    usernameLabel.innerText = "Username"

    usernameInput.type = "text"
    usernameInput.className = "form-control"
    usernameInput.id = "username"
    usernameInput.placeholder = "Enter Username"
    usernameInput.autocomplete = "off"
 
    submitButton.type = "submit"
    submitButton.className = "btn btn-primary"
    submitButton.innerText = "Login"
    //
    
    //appending
    usernameDiv.append(usernameLabel, usernameInput)
    loginForm.append(usernameDiv, submitButton)
    sideBarDiv.append(loginForm)
    //

    //event login when submit
    loginForm.addEventListener("submit", login)
    //

}   

let login = (form) => {
    //prevents reload
    form.preventDefault()
    //

    let username = form.target.username.value

    // fetch POST request
    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            //input is the key ... value is username which holds what the user put in form
            input: username
        })
    })
        .then(res => res.json())
        .then(response => {

            //gives back the response from the backend
            //if id exist then a match was found
            //else log the error log
            if(response.id){
                //has user object
                renderUser(response)
            } else {
                console.log(response)
            }

        })
}

// ------------ WHAT TO DO WITH USER RESPONSE ------------
let renderUser = (user) => {
    //function calls, passing in user object
    setSideBar(user)
    // setClassrooms(user)
    fetchData()
}

// ------------ SET SIDE BAR AFTER LOGIN ------------

let setSideBar = (user) => {

    clear(sideBarDiv)

    //initializing tags tovariables
    let username = document.createElement("p")
    let logOutButton = document.createElement("button")
    //

    //assigning values to elements attributes
    username.className = "font-weight-bold text-center" 
    username.innerText = `Logged in as ${user.name}`
    
    logOutButton.className = "btn btn-danger"
    logOutButton.innerText = "Logout"
    //

    //appending
    sideBarDiv.append(username, logOutButton)
    //

    //when logout is clicked
    logOutButton.addEventListener("click", (loggingOut) => {
        logOut()
    })
}

let logOut = () => {
    clear(bookCollection)
    loginForm()
}


// ------------ SET MAIN CONTAINER AFTER LOGIN ------------


//************************************/
// slapping on the DOM

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
    const bookCol = document.createElement("div")
    const bookDiv = document.createElement("div")
    const bookBody = document.createElement("div")
    const bookTitle = document.createElement("h5")
    const bookAuthor = document.createElement("p")
    const bookGenre = document.createElement("p")
    const bookLikes = document.createElement("p")
    const bookCover = document.createElement("img")
    const likesButton = document.createElement("button")

    bookCol.classList.add("col-sm-6")
    bookDiv.classList.add("card")
    bookBody.classList.add("card-body")
    bookTitle.classList.add("card-title")
    bookCover.classList.add("card-img-top")
    likesButton.classList.add("like-button")
    
    bookDiv.style = "width: 18rem;"
    bookCover.alt = "Card image cap"

    bookDiv.id = book.id
    bookTitle.innerText = book.title
    bookAuthor.innerText = book.author
    bookGenre.innerText = book.genre
    // bookCover.src = book.image
    bookLikes.innerText = book.likes

    bookBody.append(bookTitle)
    bookBody.append(bookAuthor)
    bookBody.append(bookGenre)
    bookBody.append(bookLikes)
    bookDiv.append(bookCover)
    bookDiv.append(bookBody)
    bookCol.append(bookDiv)
    bookRow.append(bookCol)

}

const clear = (parent) => {
    let child = parent.lastElementChild
    while (child) { 
        parent.removeChild(child) 
        child = parent.lastElementChild
    }
    //removeChild() removes the SPECIFIED child from the parent element
    //returns the removed child...thus can use appendChild to place it elsewhere
}