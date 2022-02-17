const express = require('express');
const bookController = require('../controllers/bookController');

const routes = Book => {
    const bookRouter = express.Router();

    const { getBooks, postBook, getBook, putBook, deleteBook } = bookController(Book);

    bookRouter
        .route('/books')
        .get(getBooks)
        .post(postBook)

    bookRouter
        .route('/books/searches')
        .get(getBook)    

    bookRouter
        .route('/books/:bookId')
        .put(putBook) 
        .delete(deleteBook)   

    return bookRouter;    
}

module.exports = routes;