const express = require('express');
const bookController = require('../controllers/bookController');
const validator = require('express-joi-validation').createValidator()
const validation = require('../validations/booksValidation')

const routes = Book => {
    const bookRouter = express.Router();

    const { getBooks, postBook, getBook, putBook, deleteBook } = bookController(Book);

    bookRouter
        .route('/books')
        .get(getBooks)
        .post(validator.body(validation), postBook)

    bookRouter
        .route('/books/searches')
        .get(getBook)    

    bookRouter
        .route('/books/:bookId')
        .put(validator.body(validation), putBook) 
        .delete(deleteBook)   

    return bookRouter;    
}

module.exports = routes;