import NotFound from '../errors/NotFound.js';
import { authors } from '../models/index.js';

class AuthorController {

  static async requestAuthors(req, res, next) {
    try {
      const arrayAuthors = authors.find();
      
      req.result = arrayAuthors;

      next();
    } catch (err) {
      next(err);
    };
  };

  static async requestAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const authorFound = await authors.findById(id);

      if (authorFound !== null) {
        res.status(200).send(authorFound);
      } else {
        next(new NotFound('author id not founded'));
      }
    } catch (err) {
      next(err);
    };
  };

  static async updateAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await authors.findByIdAndUpdate(id, req.body);

      if (result !== null) {
        res.status(200).send({ message: 'author updated successfully' });
      } else {
        next(new NotFound('author id not founded'));
      }
    } catch (err) {
      next(err);
    };
  };

  static async postAuthors(req, res, next) {
    try {
      const newAuthor = await authors.create(req.body);
      res.status(201).json({ message: 'author registered successfully', author: newAuthor });
    } catch (err) {
      next(err);
    };
  };

  static async deleteAuthorById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await authors.findByIdAndDelete(id);

      if (result !== null) {
        res.status(200).json({ message: 'author deleted successfully' });
      } else {
        next(new NotFound('author id not founded'));
      }
    } catch (err) {
      next(err);
    };
  };

  static async requestAuthorByFilter(req, res, next) {
    try {
      const {name, popularity} = req.query;
      const search = {};
  
      if (name) search.name = {$regex: name, $options: 'i'};
      if (popularity) search.popularity = {$regex: popularity, $options: 'i'};

      if (search.length !== 0 && search !== null) {
        const filteredSearch = authors.find(search);
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

export default AuthorController;