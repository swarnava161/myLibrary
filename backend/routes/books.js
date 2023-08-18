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

//get the length
// router.get('/:param', async (req, res) => {
//   try {
//     const { param } = req.params;
//     const regex = new RegExp(param, 'i');

//     const searchQuery = {
//       $or: [
//         { title: regex },
//         { author: regex },
//         { categories: regex }
//       ],
//       isAvailable: true
//     };

//     const books = await Book.find(searchQuery);
//     const totalBooksAvailable = books.length;

//     const groupedBooks = books.reduce((acc, book) => {
//       const key = book.title || book.author || book.categories;
//       if (!acc[key]) {
//         acc[key] = 1;
//       } else {
//         acc[key]++;
//       }
//       return acc;
//     }, {});

//     const sortedBooks = Object.keys(groupedBooks).sort((a, b) => {
//       return groupedBooks[b] - groupedBooks[a];
//     });

//     res.json({ totalBooksAvailable, sortedBooks });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });






// Get books by name
// router.get('/:param', async (req, res) => {
//   try {
//     const { param } = req.params;
//     const regex = new RegExp(param, 'i');
//     let books;
//     let length = 0;

//     if (param.toLowerCase() === 'name') {
//       // Fetch only the first matching book
//       const book = await Book.findOne({ title: regex });
//       books = book ? [book] : [];
//       length = books.length;
//     } else {
//       // Fetch all matching books and return unique titles
//       const allBooks = await Book.aggregate([
//         { $match: { $or: [{ title: regex }, { author: regex }, { categories: regex }] } },
//         { $sort: { title: 1 } }
//       ]);

//       const uniqueTitles = new Set();
//       books = allBooks.filter(book => {
//         if (!uniqueTitles.has(book.title)) {
//           uniqueTitles.add(book.title);
//           return true;
//         }
//         return false;
//       });

//       length = books.length;
//     }

//     if (length === 0) {
//       return res.status(404).json({ message: 'No books found with the given parameter' });
//     }

//     const bookInfo = {
//       length,
//       books: books.map(book => ({
//         title: book.title,
//         author: book.author,
//         description: book.description,
//         publishedDate: book.publishedDate,
//         numberOfPages: book.numberOfPages,
//         isAvailable: book.isAvailable,
//         categories: book.categories
//       }))
//     };

//     res.json(bookInfo);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });













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




// router.get('/count', async (req, res) => {
//   const { search } = req.query;

//   try {
//     const count = await Book.countDocuments({ title: { $regex: search, $options: 'i' } });
//     res.json({ count });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });






module.exports = router;
