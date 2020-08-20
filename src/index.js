const booksUrl = "http://localhost:3000/books"
const sideBarDiv = document.querySelector("#sidebar")
const bookCollection = document.querySelector("#book-collection")
const bookRow = document.querySelector(".row")
const buttonLeader = document.querySelector("#bttn-leader")

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
    setFilterbutton()
    fetchBooks()
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
    logOutButton.addEventListener("click", () => {
        logOut()
    })
}

let logOut = () => {
    clear(bookCollection)
    clear(buttonLeader)
    loginForm()
}

const setFilterbutton = () => {
    let allLabel = document.createElement("label")
    let adventureLabel = document.createElement("label")
    let fantasyLabel = document.createElement("label")
    let romanceLabel = document.createElement("label")
    let mysteryLabel = document.createElement("label")
    let sciFiLabel = document.createElement("label")
    let horrorLabel = document.createElement("label")

    let allInput = document.createElement("input")
    let adventureInput = document.createElement("input")
    let fantasyInput = document.createElement("input")
    let romanceInput = document.createElement("input")
    let mysteryInput = document.createElement("input")
    let sciFiInput = document.createElement("input")
    let horrorInput = document.createElement("input")

    allLabel.classList.add("btn","btn-secondary","active")
    adventureLabel.classList.add("btn","btn-secondary")
    fantasyLabel.classList.add("btn", "btn-secondary")
    romanceLabel.classList.add("btn" ,"btn-secondary")
    mysteryLabel.classList.add("btn", "btn-secondary")
    sciFiLabel.classList.add("btn","btn-secondary")
    horrorLabel.classList.add("btn","btn-secondary")

    allInput.type = "radio"
    adventureInput.type = "radio"
    fantasyInput.type = "radio"
    romanceInput.type = "radio"
    mysteryInput.type = "radio"
    sciFiInput.type = "radio"
    horrorInput.type = "radio"

    allInput.name = "options"
    adventureInput.name = "options"
    fantasyInput.name = "options"
    romanceInput.name = "options"
    mysteryInput.name = "options"
    sciFiInput.name = "options"
    horrorInput.name = "options"

    allInput.id = "option1"
    adventureInput.id = "option2"
    fantasyInput.id = "option3"
    romanceInput.id = "option4"
    mysteryInput.id = "option5"
    sciFiInput.id = "option6"
    horrorInput.id = "option7"

    allInput.autocomplete = "off"
    adventureInput.autocomplete = "off"
    fantasyInput.autocomplete = "off"
    romanceInput.autocomplete = "off"
    mysteryInput.autocomplete = "off"
    sciFiInput.autocomplete = "off"
    horrorInput.autocomplete = "off"

    allInput.checked = true

    allLabel.innerText = "All"
    adventureLabel.innerText = "Adventure"
    fantasyLabel.innerText = "Fantasy"
    romanceLabel.innerText = "Romance"
    mysteryLabel.innerText = "Mystery"
    sciFiLabel.innerText = "Sci-Fi"
    horrorLabel.innerText = "Horror"

    allLabel.append(allInput)
    adventureLabel.append(adventureInput)
    fantasyLabel.append(fantasyInput)
    romanceLabel.append(romanceInput)
    mysteryLabel.append(mysteryInput)
    sciFiLabel.append(sciFiInput)
    horrorLabel.append(horrorInput)

    buttonLeader.append(allLabel, adventureLabel, fantasyLabel, romanceLabel, mysteryLabel, sciFiLabel, horrorLabel)

}

// ------------ SET MAIN CONTAINER AFTER LOGIN ------------


//************************************/
// slapping on the DOM

const fetchBooks = () => {
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
    const viewButton = document.createElement("button")

    bookCol.classList.add("col-sm-6")
    bookDiv.classList.add("card")
    bookBody.classList.add("card-body")
    bookTitle.classList.add("card-title")
    bookCover.classList.add("card-img-top")
    likesButton.classList.add("like-button")
    viewButton.classList.add("btn", "btn-info")

    bookDiv.style = "width: 18rem;"
    bookCover.alt = "Card image cap"

    bookDiv.id = book.id
    bookTitle.innerText = book.title
    bookAuthor.innerText = book.author
    bookGenre.innerText = book.genre
    bookLikes.innerText = book.likes
    viewButton.innerText = "View Comments"

    bookBody.append(bookTitle)
    bookBody.append(bookAuthor)
    bookBody.append(bookGenre)
    bookBody.append(bookLikes)
    bookBody.append(likesButton)
    bookBody.append(viewButton)
    bookDiv.append(bookCover)
    bookDiv.append(bookBody)

    viewButton.addEventListener("click", () => {
        clearExcept(bookCollection.id, book.id)
        bookBody.removeChild(viewButton)
    })

    bookCol.append(bookDiv)
    bookRow.append(bookCol)

}



// -----------------HELPERS--------------------

const clearExcept = (parentId, exceptId) => {
    let matched = document.getElementById(exceptId)
    parent = document.getElementById(parentId)

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    parent.appendChild(matched)
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