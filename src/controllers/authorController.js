import { author } from "../models/Author.js";

class AuthorController {

    static async requestAuthors(_, res) {
        try {
            const arrayAuthors = await author.find({});
            res.status(200).json(arrayAuthors);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - request failed` });
        };
    };

    static async requestAuthorById(req, res) {
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id);
            res.status(200).json(authorFound);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - author request failed` });
        };
    };

    static async updateAuthorById(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'author updated successfully' });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - failed to update author` });
        };
    };

    static async postAuthors(req, res) {
        try {
            const newAuthor = await author.create(req.body)
            res.status(201).json({ message: 'author registered successfully', author: newAuthor });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - failed to register author` });
        };
    };

    static async deleteAuthorById(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: 'author deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - failed to delete author` });
        };
    };
};

export default AuthorController;