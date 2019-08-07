const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger.js')
const bookmarksRouter = express.Router()
const bodyParser = express.json()
const books = require('../bookmarks_db.js');

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    // move implementation logic into here
    res.json(books);
  })
  .post(bodyParser, (req, res) => {
    // move implementation logic into here
    const { author , price , publisher, title} = req.body;
    if (!author || !price || !publisher || !title ) {
      logger.error(`Author, Price, Publisher and Title are required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    // get an id
    const id = uuid();
    const book = {
      author,
      id,
      price,
      publisher,
      title
    };

    books.push(book);
    logger.info(`Book with id ${id} created`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmark/${id}`)
      .json({id});
  })

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    // move implementation logic into here
    const { id } = req.params;
    const book = books.find(book => book.id == id);

    // make sure we found a list
    if (!book) {
      logger.error(`Book with id ${id} not found.`);
      return res
        .status(404)
        .send('Book Not Found');
    }

    res.json(book);
  })
  .delete((req, res) => {
    // move implementation logic into here
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id == id);

    if (bookIndex === -1) {
      logger.error(`Book with id ${id} not found.`);
      return res
        .status(404)
        .send('Not Found');
    }
    books.splice(bookIndex, 1);
    logger.info(`Book with id ${id} deleted.`);
    res
      .status(204)
      .end();
  })

module.exports = bookmarksRouter
