const { response } = require("express");

const bookController = Book => {
    const getBooks = (async (req, res) => {
        const books = await Book.find();

        if(books.length > 0) {
            res.json({message: "Books", books: books})
        } else {
            res.json({message: "no books exist"})
        }
    });

    const postBook = (async (req, res) => {
        const book = new Book(req.body);

        await book.save();
        res.json({message: "Book created", book: book});
    });

    const getBook = (async (req, res) => {
        const { query } = req;

        try {
            const book = await Book.find(query);
            if(Object.keys(book).length === 0) res.json({message: "Not found Book"})
            else res.json({message: "Found Book", book});
        } catch(err) {
            res.status(400).json({message: "Not found book"})
        }
    });

    const putBook = (async (req, res) => {
        const { body } = req;

        try{
            await Book.updateOne(
                {
                    _id: req.params.bookId
                },
                {
                    $set: {
                        title: body.title,
                        genre: body.genre,
                        author: body.author,
                        read: body.read
                    }
                }
            )
            res.json({message: "Modified book"});
        } catch(err) {
            res.status(400).json({message: "Not found book"})
        }
    })

    const deleteBook = (async (req, res) => {
        const { params } = req;

        try {
            const book = await Book.findById(params.bookId);
            await Book.deleteOne(book);
            res.json({message: "Deleted Book"})
        } catch(err) {
            res.status(400).json({message: "Noy found book"})
        }
    })

    return { getBooks, postBook, getBook, putBook, deleteBook };
}

module.exports = bookController;