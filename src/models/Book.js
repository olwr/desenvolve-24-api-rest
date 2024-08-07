import mongoose from 'mongoose';
import { authorSchema } from './Author.js';

const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  // eslint-disable-next-line quotes
  title: { type: String, required: [true, "the book's name is required"] },
  publisher: { type: String },
  // eslint-disable-next-line quotes
  price: { type: Number, required: [true, "the book's price is required"] },
  pages: { 
    type: Number, 
    min: [15, 'invalid number of pages - {VALUE} is less than the minimum of 15 pages'], 
    max: [5000, 'invalid number of pages - {VALUE} is greater than the limit of 5000 pages'] 
  },
  author: authorSchema
}, { versionKey: false });

const book = mongoose.model('books', bookSchema);

export default book;

/* alternative → custom validation
validate: (value) => {
  return value >= 10 && value <= 5000;
  }

OR

validate: {
  validator: (value) => {
  return value >= 10 && value <= 5000;}
  },
  message: 'the number of pages has to be between 15 and 5000. {VALUE} is outside the limit'
*/