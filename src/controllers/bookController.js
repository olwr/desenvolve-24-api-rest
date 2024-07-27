import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {

    static async requestBooks(_, res) {
        try {
            const arrayBooks = await book.find({});
            res.status(200).json(arrayBooks);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - request failed` });
        };
    };

    static async requestBookById(req, res) {
        try {
            const id = req.params.id;
            const bookFound = await book.findById(id);
            res.status(200).json(bookFound);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - book request failed` });
        };
    };


    static async updateBookById(req, res) {
        const updates = req.body;

        try {
            const id = req.params.id;
            const foundedAuthor = await author.findById(updates.author);
            let updatedBook = '';

            if (foundedAuthor === null) {
                updatedBook = updates;
            } else {
                updatedBook = {...updates, author: {...foundedAuthor._doc}}
            }

            await book.findByIdAndUpdate(id, updatedBook);
            res.status(200).json({message: 'book updated successfully'});
        } catch (err) {
            res.status(500).json({ message: `${err.message} - failed to update book` });
        };
    };

    static async postBooks(req, res) {
        const newBook = req.body;

        try {
            const foundedAuthor = await author.findById(newBook.author);
            const completeBook = {...newBook, author: {...foundedAuthor._doc }};
            const createdBook = await book.create(completeBook);
            res.status(201).json({ message: 'book registered successfully', book: createdBook });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - failed to register book` });
        };
    };

    static async deleteBookById(req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({message: 'book deleted successfully'});
        } catch (err) {
            res.status(500).json({ message: `${err.message} - failed to delete book` });
        };
    };

    static async requestBookByPublisher(req, res) {
        const publisher = req.query.publisher;

        try {
            const booksByPublisher = await book.find({publisher: publisher});
            res.status(200).json(booksByPublisher);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - book request failed` });
        }
    };
};

export default BookController;