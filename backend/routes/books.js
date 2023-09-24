const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, description, publishedDate, numberOfPages, isAvailable, categories } = req.body;

    // Input validation
    if (!title || !author || !description || !publishedDate || !numberOfPages || !isAvailable || !categories) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    const newBook = new Book({
      title: capitalizedTitle,
      author,
      description,
      publishedDate,
      numberOfPages,
      isAvailable,
      categories
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});






















//get by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, publishedDate, numberOfPages, isAvailable, categories } = req.body;

    // Input validation
    if (!title || !author || !description || !publishedDate || !numberOfPages || !isAvailable || !categories) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        author,
        description,
        publishedDate,
        numberOfPages,
        isAvailable,
        categories
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(deletedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});










module.exports = router;
