import express from 'express';
import BookController from '../controllers/bookController.js';
import pagination from '../middlewares/pagination.js';

const router = express.Router();

router
  .get('/books', BookController.requestBooks, pagination)
  .get('/books/search', BookController.requestBookByFilter, pagination)
  .get('/books/:id', BookController.requestBookById)
  .post('/books', BookController.postBooks)
  .put('/books/:id', BookController.updateBookById)
  .delete('/books/:id', BookController.deleteBookById);

export default router;