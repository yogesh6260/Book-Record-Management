const express = require('express');
const { getAllBooks, getBookByID, getAllIssuedBooks, addNewBook, updateBookByID } = require('../controllers/book-controller');

const router = express.Router();

// Route : /books
// Method : GET
// Description : Get all the books
// Access: Public
// Parameters: none

router.get("/", getAllBooks);

// Route : /books/:id
// Method : GET
// Description : Get a book by their id
// Access: Public
// Parameters: id

router.get("/:id", getBookByID);

// Route : /books/issued/all
// Method : GET
// Description : Get all issued books
// Access: Public
// Parameters: none

router.get("/issued/all", getAllIssuedBooks);

// Route : /books
// Method : POST
// Description : Add New Book
// Access: Public
// Parameters: none

router.post("/", addNewBook);

// Route : /books/:id
// Method : PUT
// Description : Updating a book
// Access: Public
// Parameters: id

router.put("/:id", updateBookByID);

// Default Export
module.exports = router;