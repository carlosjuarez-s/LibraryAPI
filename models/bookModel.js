const mongoose = require('mongoose');

const bookModel = mongoose.Schema({
    title: { type:String },
    genre: { type:String },
    author: { type:String },
    read: { type:Boolean, default: false }
})

module.exports = mongoose.model("Book", bookModel);