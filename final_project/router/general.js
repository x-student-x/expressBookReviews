const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});

});

public_users.post("/customer/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
   if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }});


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
          //showISBNTitle =  JSON.stringify(keys) + ":" + (JSON.stringify(values)).toString()
          showISBNTitle =  keys + " : " + values
        }
        if(JSON.stringify(keys) === JSON.stringify("reviews")){
          console.log(keys, " : ", values)
          reviewsForISBN.push(keys,JSON.stringify(values))
        }
    }
    });
  });
  return res.send("ISBN : " + reviewByISBN + "\n" + showISBNTitle + '\n' + reviewsForISBN)
});

module.exports.general = public_users;
