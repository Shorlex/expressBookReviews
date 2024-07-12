const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
    if(!isValid(username)){
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    }
    return res.status(404).json({message: "User already exists!"})
  }

  return res.status(404).json({message: "Username and Password are missing"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["author"] === req.params.author){
        author.push({"isbn":isbn, "title":books[isbn]["title"], "reviews":books[isbn]["reviews"]});
    }
  });
  return res.send(JSON.stringify({author}, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"] === req.params.title){
        title.push({"isbn":isbn, "title":books[isbn]["title"], "reviews":books[isbn]["reviews"]});
    }
  });
  return res.send(JSON.stringify({title}, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let review = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["isbn"] === req.params.isbn){
        review.push({"reviews":books[isbn]["reviews"]});
    }
  });
  return res.send(JSON.stringify({review}, null, 4));
});

module.exports.general = public_users;
