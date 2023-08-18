const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Borrowing = require('../models/Borrowing');
// const authMiddleware = require('../middleware/authMiddleware');

// Borrow a book
// Borrow a book
router.post('/', async (req, res) => {
  const { user, books } = req.body;
  
  try {
    const userId = user[0].userId;
    const bookId = books[0].bookId;

    const foundUser = await User.findById(userId);
    const foundBook = await Book.findById(bookId);

    if (!foundUser || !foundBook) {
      return res.status(404).json({ message: 'User or book not found' });
    }

    // Check if the user has previously borrowed the book
    let previousBorrowing = await Borrowing.findOne({ 'user.userId': userId });
    
    if (previousBorrowing) {
      // User has previously borrowed the book, update the borrowing record
      previousBorrowing.books.unshift({
        bookId: foundBook._id,
        book: {
          title: foundBook.title,
          author: foundBook.author,
          description: foundBook.description
        },
        borrowedDate: new Date(),
        borrowingStatus: true,
        returnDate: null
      });

      await previousBorrowing.save();
      
      return res.status(200).json({ message: 'Book added to existing borrowing record', previousBorrowing });
    }

    // Create a new borrowing record
    const newBorrowing = new Borrowing({
      user: [{
        userId: foundUser._id,
        userEmail: foundUser.email,
        userRole: foundUser.role
      }],
      books: [{
        bookId: foundBook._id,
        book: {
          title: foundBook.title,
          author: foundBook.author,
          description: foundBook.description
        },
        borrowedDate: new Date(),
        borrowingStatus: true,
        returnDate: null
      }]
    });

    await newBorrowing.save();
    
    res.status(201).json({ message: 'Book borrowed successfully', newBorrowing });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});




router.put('/return/:id', async (req, res) => {
  const { id } = req.params;
  const { returnDate } = req.body;

  try {
    const borrow = await Borrowing.findOneAndUpdate(
      { 'books.bookId': id },
      { $set: { 'books.$.returnDate': returnDate } },
      { new: true }
    );

    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    res.json({ message: 'Return date updated successfully', borrow });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});











// Get borrowing information for the logged-in user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const borrowings = await Borrowing.find({ 'user.userId': userId });
    res.json({ borrowings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get("/books/returned/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const borrowing = await Borrowing.findOne({ "user.userEmail": email });
    if (!borrowing) {
      return res.status(404).json({ message: "User not found or no books borrowed" });
    }

    const books = borrowing.books.filter(book => book.returnDate === null);
    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});







  
  module.exports = router;
  
