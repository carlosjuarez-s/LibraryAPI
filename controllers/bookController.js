

const bookController = Book => {
    const getBooks = (async (req, res) => {
        const response = await Book.find();

        res.json(response);
    });

    const postBook = (async (req, res) => {
        const book = new Book(req.body);

        await book.save();
        res.json(book);
    });

    //Searches
    const getBook = (async (req, res) => {
        var response;

        const { query } = req;
        const book = await Book.find(query);
            
        response = {message: "Found Book", book};
       
        res.json(response)
    });

    const putBook = (async (req, res) => {
        const { body } = req;
        const response = await Book.updateOne(
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

        res.json("Modified book");
    })

    const deleteBook = (async (req, res) => {
        const { params } = req;

        const book = await Book.findById(params.bookId);
        await Book.deleteOne(book);

        res.json("Deleted Book")
    })

    return { getBooks, postBook, getBook, putBook, deleteBook };
}

module.exports = bookController;