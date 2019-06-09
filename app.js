const express = require('express');
const mongoose = require('mongoose');

const app = express();

if(process.env.ENV === 'test'){
  const db = mongoose.connect('mongodb://localhost/bookAPI_test', { useNewUrlParser: true });
} else {
  console.log('this is for production');
  const db = mongoose.connect('mongodb://localhost/bookAPI-prod', { useNewUrlParser: true }); 
}

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const Book = require('./models/bookModel');
const booksRouter = require('./routes')(Book);

const port = process.env.PORT || 3000;

app.use('/api', booksRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my API',
  });
});

app.server = app.listen(port, () => console.log('connected to port ', port));

module.exports = app;
