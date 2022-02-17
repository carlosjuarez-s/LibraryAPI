const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const Person = require('./models/personModel');

const app = express();
const bookRouter = require('./routers/bookRouter')(Book);
const personRouter = require('./routers/personRouter')(Person);
    
mongoose.connect('mongodb://127.0.0.1:27017/bibliotecaDB')

const jwt = require('express-jwt');

app.all('/api/*', jwt({
    secret: 'aaa',
    algorithms: ['HS256'],
}).unless({
    path: ['/api/persons/login', '/api/persons/login/validate']
})
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080);
app.use('/api', bookRouter, personRouter);