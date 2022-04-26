const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const Person = require('./models/personModel');
const cors = require('cors');
require('dotenv').config({path: './security.env'})

const app = express();
const bookRouter = require('./routers/bookRouter')(Book);
const personRouter = require('./routers/personRouter')(Person);
    
mongoose.connect('mongodb://127.0.0.1:27017/libraryAPI')

const jwt = require('express-jwt');

app.all('/api/*', jwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'],
}).unless({
    path: ['/api/persons/login', '/api/persons/login/validate', {url: '/api/persons', method:'POST'}]
}))

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({message: 'invalid token...'});
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080, () => {
    console.log("Listen port 8080")
});
app.use('/api', bookRouter, personRouter);