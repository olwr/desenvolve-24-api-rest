import express from 'express';
import AuthorController from '../controllers/authorController.js';
import pagination from '../middlewares/pagination.js';

const router = express.Router();

router
  .get('/author', AuthorController.requestAuthors, pagination)
  .get('/author/search', AuthorController.requestAuthorByFilter, pagination)
  .get('/author/:id', AuthorController.requestAuthorById)
  .put('/author/:id', AuthorController.updateAuthorById)
  .post('/author', AuthorController.postAuthors)
  .delete('/author/:id', AuthorController.deleteAuthorById);

export default router;