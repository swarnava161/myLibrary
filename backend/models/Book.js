const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
   
  },
  numberOfPages: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  categories: [
    {
      type: String
    }
  ]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

