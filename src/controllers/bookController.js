import NotFound from '../errors/NotFound.js';
import { authors, books } from '../models/index.js';

class BookController {

  static async requestBooks(req, res, next) {
    try {
      const arrayBooks = books.find();

      req.result = arrayBooks;

      next();
    } catch (err) {
      next(err);
    };
  };

  static async requestBookById(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await books.findById(id);

      if (bookFound !== null) {
        res.status(200).send(bookFound);
      } else {
        next(new NotFound('book id not founded'));
      }
    } catch (err) {
      next(err);
    };
  };


  static async updateBookById(req, res, next) {
    const updates = req.body;

    try {
      const id = req.params.id;
      const foundedAuthor = await authors.findById(updates.author);
      let updatedBook = '';

      if (foundedAuthor === null) {
        updatedBook = updates;
      } else {
        updatedBook = { ...updates, author: { ...foundedAuthor._doc } };
      }

      const result = await books.findByIdAndUpdate(id, updatedBook);

      if (result !== null) {
        res.status(200).send({ message: 'book updated successfully' });
      } else {
        next(new NotFound('book id not founded'));
      }
    } catch (err) {
      next(err);
    };
  };

  static async postBooks(req, res, next) {
    const newBook = req.body;

    try {
      const foundedAuthor = await authors.findById(newBook.author);
      const completeBook = { ...newBook, author: { ...foundedAuthor._doc } };
      const createdBook = await books.create(completeBook);
      res.status(201).json({ message: 'book registered successfully', book: createdBook });
    } catch (err) {
      console.log(err);
      next(err);
    };
  };

  static async deleteBookById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await books.findByIdAndDelete(id);

      if (result !== null) {
        res.status(200).json({ message: 'book deleted successfully' });
      } else {
        next(new NotFound('book id not founded'));
      }
    } catch (err) {
      next(err);
    };
  };

  static async requestBookByFilter(req, res, next) {
    try {
      const search = await processSearch(req.query);

      if (search !== null && search.length !== 0) {
        const filteredSearch = books.find(search);
        req.result = filteredSearch;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  };
};

async function processSearch(params) {
  const { title, publisher, price, minPages, maxPages, author } = params;
  let search = {};
  if (minPages || maxPages) search.pages = {};

  if (title) search.title = { $regex: title, $options: 'i' };
  if (price) search.price = { $eq: price };
  if (publisher) search.publisher = { $regex: publisher, $options: 'i' }; // OR new RegExp(publisher, 'i')

  if (minPages) search.pages.$gte = minPages;
  if (maxPages) search.pages.$lte = maxPages;

  if (author) {
    const authorName = await authors.findOne({ name: {$regex: author, $options: 'i' }});

    if (authorName !== null) {
      search.author = authorName;
    } else {
      search.author = null;
    }
  }
  return search;
}

export default BookController;