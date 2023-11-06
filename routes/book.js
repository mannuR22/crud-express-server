const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
// Example route for the root path
router.get('/', bookController.welcomeMessage);

//Add New Book
router.post('/books-service/book/insert', bookController.insertBook);
//View list of all books
router.get('/books-service/book/list', bookController.getBooks);
//View list of specific books by its id
router.get('/books-service/get/book/:bookId', bookController.getBook);
//Update book's details
router.patch('/books-service/update/book/:bookId', bookController.updateBook);
//Delete a book
router.delete('/books-service/delete/book/:bookId', bookController.deleteBook);

module.exports = router;
