const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  return res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const bookByISBN = req.params.isbn;
  return res.send(books[bookByISBN])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const byAuthor = req.params.author;
  const bookByAuthor = [];
  Object.entries(books).forEach(([id, details]) => {
    //console.log(`${JSON.stringify(id)}: ${JSON.stringify(details)}`);
    Object.entries(details).forEach(([keys, values]) =>{
        //console.log(`${JSON.stringify(keys)}: ${JSON.stringify(values)}`)
        if(JSON.stringify(values) === JSON.stringify(byAuthor)){
            bookByAuthor.push(id,details)
        }
    });
  });
  return res.send(bookByAuthor)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const byTitle = req.params.title;
  const bookBytitle = [];
  Object.entries(books).forEach(([id, details]) => {
    //console.log(`${JSON.stringify(id)}: ${JSON.stringify(details)}`);
    Object.entries(details).forEach(([keys, values]) =>{
        //console.log(`${JSON.stringify(keys)}: ${JSON.stringify(values)}`)
        if(JSON.stringify(values) === JSON.stringify(byTitle)){
            bookBytitle.push(id,details)
        }
    });
  });
  return res.send(bookBytitle)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const reviewByISBN = req.params.isbn;
  var showISBNTitle = ""
  const reviewsForISBN = [];
  //return res.send(books[reviewByISBN])
  Object.entries(books).forEach(([id, details]) => {
    //console.log(`${JSON.stringify(id)}: ${JSON.stringify(details)}`);
    Object.entries(details).forEach(([keys, values]) => {
      //console.log(`${JSON.stringify(keys)}: ${JSON.stringify(values)}`);
      if(JSON.stringify(id) === JSON.stringify(reviewByISBN)){
        if(JSON.stringify(keys) === JSON.stringify("title") || JSON.stringify(keys) === JSON.stringify("author")){
          console.log(keys, ":", values)
          showISBNTitle = JSON.stringify(keys).concat(JSON.stringify(values))
        }
        if(JSON.stringify(keys) === JSON.stringify("reviews")){
          console.log(keys, ":", values)
          reviewsForISBN.push(keys,JSON.stringify(values))
        }
    }
    });
  });
  return res.send(reviewByISBN + showISBNTitle + '\n' + reviewsForISBN)
});

module.exports.general = public_users;
