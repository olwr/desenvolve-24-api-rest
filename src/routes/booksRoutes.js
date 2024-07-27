import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get('/books', BookController.requestBooks);
routes.get('/books/search', BookController.requestBookByPublisher);
routes.get('/books/:id', BookController.requestBookById);
routes.put('/books/:id', BookController.updateBookById);
routes.post('/books', BookController.postBooks);
routes.delete('/books/:id', BookController.deleteBookById);

export default routes;