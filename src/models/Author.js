import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  // eslint-disable-next-line quotes
  name: { type: String, required: [true, "the author's name is required"] },
  popularity: { type: String, enum: { values: ['meh', 'good', 'great'], message: 'popularity {VALUE} is a invalid value' } }
}, { versionKey: false });

const author = mongoose.model('authors', authorSchema);

export { author, authorSchema };