const mongoose = require('mongoose');

const borrowingSchema = new mongoose.Schema({
  user: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      required: true
    }
  }],
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    book: {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      }
    },
    borrowedDate: {
      type: Date,
      default: Date.now
    },
    borrowingStatus: {
      type: Boolean,
      default: true
    },
    returnDate: {
      type: Date,
      default: null
    }
  }]
});

module.exports = mongoose.model('Borrowing', borrowingSchema);
