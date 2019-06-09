/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const booksController = (Book) => {
  const post = (req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body cannot be empty' });
    }
    if (!req.body.title) {
      res.status(400);
      return res.json('Title is required');
    }
    const theBook = new Book(req.body);
    theBook.save();

    return res.status(201).json({
      message: 'Book has been saved successfully',
      theBook,
    });
  };


  const get = (req, res) => {
    Book.find((err, books) => {
      if (err) {
        res.status(400);
        return res.json(err);
      }
      res.status(404);
      return res.json(books);
    });
  };


  const type = (req, res) => {
    const { query } = req.params;

    Book.findOne({ genre: query }, (err, theBook) => {
      err || !theBook
        ? res.status(404).json({ message: 'Not found' })
        : res.status(200).json({ theBook });
    });
  };


  const findBook = (req, res) => {
    res.status(200).json(req.book);
  };

  const put = (req, res) => {
    const { theBook } = req.body;
    const {
      author, title, genre, read,
    } = req.body;
    theBook.author = author;
    theBook.title = title;
    theBook.genre = genre;
    theBook.read = read;
    res.status(200).json({
      theBook,
    });
  };

  const patch = (req, res) => {
    const { book } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    req.book.save(err => res.status(400).json({
      error: err,
    }));
    return res.status(200).json({ message: 'book updated successfully!' });
  };

  const deleteBook = (req, res) => {
    req.book.remove(err => res.status(400).json({
      error: err,
    }));
    return res.status(204).json({ message: 'book deleted' })
  };

  return {
    post, get, type, findBook, put, patch, deleteBook,
  };
};

module.exports = booksController;
