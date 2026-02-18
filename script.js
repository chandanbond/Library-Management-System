let books = [];
let issuedBookIndex = null;

function login() {
  let role = document.querySelector('input[name="role"]:checked').value;
  let pass = document.getElementById("password").value;

  if ((role === "admin" && pass === "admin") || 
      (role === "user" && pass === "user")) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    document.getElementById("loginError").innerText = "Invalid Login!";
  }
}

function addBook() {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("authorName").value;

  if (name === "" || author === "") {
    document.getElementById("addError").innerText = "All fields required!";
    return;
  }

  books.push({name, author});
  document.getElementById("addError").innerText = "";
  displayBooks();
}

function displayBooks() {
  let table = document.getElementById("bookTable");
  table.innerHTML = "";

  books.forEach((b, i) => {
    table.innerHTML += `
      <tr>
        <td><input type="radio" name="selectBook" value="${i}"></td>
        <td>${b.name}</td>
        <td>${b.author}</td>
      </tr>
    `;
  });
}

function issueBook() {
  let selected = document.querySelector('input[name="selectBook"]:checked');
  if (!selected) {
    document.getElementById("actionMsg").innerText = "Select a book!";
    return;
  }

  issuedBookIndex = selected.value;
  let issueDate = new Date();
  let returnDate = new Date();
  returnDate.setDate(issueDate.getDate() + 15);

  document.getElementById("actionMsg").innerText =
    "Issued! Return by " + returnDate.toDateString();
}

function returnBook() {
  if (issuedBookIndex === null) {
    document.getElementById("actionMsg").innerText = "No book issued!";
    return;
  }

  let fine = Math.floor(Math.random() * 50);
  if (fine > 0) {
    let paid = confirm("Fine ₹" + fine + " Pay?");
    if (!paid) return;
  }

  issuedBookIndex = null;
  document.getElementById("actionMsg").innerText = "Book Returned!";
}
