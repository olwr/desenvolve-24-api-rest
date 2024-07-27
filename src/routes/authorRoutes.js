import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get('/author', AuthorController.requestAuthors);
routes.get('/author/:id', AuthorController.requestAuthorById);
routes.put('/author/:id', AuthorController.updateAuthorById);
routes.post('/author', AuthorController.postAuthors);
routes.delete('/author/:id', AuthorController.deleteAuthorById);

export default routes;