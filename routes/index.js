/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const express = require('express');

const booksRouter = express.Router();
const booksController = require('./../controller');

function routes(Book) {
  const controller = booksController(Book);

  booksRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  booksRouter.route('/type/:query')
    .get(controller.type);

  booksRouter.use('/books/:id', (req, res, next) => {
    Book.findById(req.params.id, (err, theBook) => {
      err || !theBook
        ? res.status(404).json({ message: 'Not found' })
        : req.book = theBook; next();
    });
  });

  booksRouter.route('/books/:id')
    .get(controller.findBook)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteBook);

  return booksRouter;
}

module.exports = routes;
