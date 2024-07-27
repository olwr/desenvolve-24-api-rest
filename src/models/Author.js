import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    popularity: { type: String, enum: ['meh', 'good', 'great'] }
}, { versionKey: false });

const author = mongoose.model('authors', authorSchema);

export { author, authorSchema };