import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReturnConfirmationPortal from "./ReturnConfirmationPortal";
// import "./Showbook.css";
// import { useParams } from 'react-router-dom';

const ShowBooks = ({ isAdmin }) => {
  // const { bookId } = useParams();
  const Navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [showPortal, setShowPortal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [rerender, setRerender] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  // const [borrowedUser, setBorrowedUser] = useState("");
  // const [isAdmin, setIsAdmin] = useState(false); // Track user's role

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    // console.log(borrowedBooks);
    fetchBooks();
  }, [rerender]);

  useEffect(() => {
    const filterBooks = () => {
      if (searchQuery) {
        const filtered = books.filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
      } else {
        setFilteredBooks(books);
      }
    };

    filterBooks();
  }, [searchQuery, books]);

  useEffect(() => {
    // Update borrowedBooks whenever books change
    const updatedBorrowedBooks = books.map((book) => ({
      id: book._id,
      isBorrowed: localStorage.getItem(book._id) === "true",
    }));
    setBorrowedBooks(updatedBorrowedBooks);
  }, [books]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const compareValues = (key) => {
    return function (a, b) {
      let comparison = 0;
      if (a[key] > b[key]) {
        comparison = 1;
      } else if (a[key] < b[key]) {
        comparison = -1;
      }
      return comparison;
    };
  };

  const handleSort = () => {
    const sortedBooks = [...filteredBooks].sort(compareValues(sortBy));
    setFilteredBooks(sortedBooks);
  };

  const handleBorrow = async (bookId) => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId);

      const userResponse = await axios.get(
        `http://localhost:5000/users/${userId}`
      );
      const user = userResponse.data;
      console.log("User:", user);

      const bookResponse = await axios.get(
        `http://localhost:5000/api/books/${bookId}`
      );
      const book = bookResponse.data;
      console.log("Book:", book);

      const borrowingData = {
        user: [
          {
            userId: user._id,
            userEmail: user.email,
            userRole: user.role,
          },
        ],
        books: [
          {
            bookId: book._id,
            book: {
              title: book.title,
              author: book.author,
              description: book.description,
            },
            borrowedDate: new Date(),
            borrowingStatus: true,
            returnDate: null,
          },
        ],
      };

      const borrowingResponse = await axios.post(
        "http://localhost:5000/borrowing",
        borrowingData
      );

      console.log(borrowingResponse.data.message);
      // setBorrowedUser(user.email);
      // console.log("this is user.email",user.email);
      // // Update the isBorrowed status for the clicked book
      //   console.log("this is borroweduser", borrowedUser);
      setBorrowedBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, isBorrowed: true } : book
        )
      );
        console.log("this are borrowed books", borrowedBooks);
      // Store the borrowed book ID in local storage
      localStorage.setItem(bookId, "true");
    } catch (error) {
      console.error("Error in borrow function:", error);
      // Handle error, e.g., show an error message or update UI
    }
  };

  const handleReturn = (bookId) => {
    setSelectedBookId(bookId);
    setShowPortal(true);
  };

  const handleConfirmReturn = async () => {
    try {
      // Perform return operation and update borrowedBooks
      console.log("Returning book with ID:", selectedBookId);

      // Update the return date for that book object of the user
      await axios.put(
        `http://localhost:5000/borrowing/return/${selectedBookId}`,
        {
          returnDate: new Date(),
        }
      );

      // Update the isBorrowed status for the clicked book

      setBorrowedBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBookId ? { ...book, isBorrowed: true } : book
        )
      );

      // Remove the borrowed book ID from local storage
      localStorage.removeItem(selectedBookId);

      setShowPortal(false);
      setRerender((prevRerender) => !prevRerender);
    } catch (error) {
      console.error("Error in handleConfirmReturn:", error);
      // Handle error, e.g., show an error message or update UI
    }
  };

  const handleCancelReturn = () => {
    setShowPortal(false);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      // Handle success
      console.log("Book deleted successfully");
      // Remove the deleted book from the state
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleUpdate = (bookId) => {
    // Implement update functionality
    Navigate(`/update-book/${bookId}`);
    console.log(bookId);
    // console.log("Updating book with ID:", bookId);
  };

  return (
    <div>
      <div className="showbook-container"></div>
      <div className="container">
        <h1 className="mt-4 text-center text-white my-3">Get any Books</h1>
        <Form className="mb-4">
          <Form.Group controlId="searchQuery">
            <Form.Control
              type="text"
              placeholder="Search any book"
              value={searchQuery}
              onChange={handleSearch}
              className="p-2"
            />
          </Form.Group>
        </Form>
        <div className="mb-4 d-flex flex-column align-items-end">
          <Form.Group controlId="sortBy">
            <h2 className="fs-4 text-white">Sort By-</h2>
            <Form.Control
              as="select"
              value={sortBy}
              onChange={handleSortBy}
              style={{ width: "150px" }}
            >
              <option value="title">Title</option>
              <option value="categories">Categories</option>
              <option value="author">Author</option>
              <option value="publishedDate">Published Date</option>
              <option value="numberOfPages">Number of Pages</option>
            </Form.Control>
          </Form.Group>
          <button
            onClick={handleSort}
            className="btn btn-dark py-2 my-2 "
            style={{ width: "120px" }}
          >
            Sort
          </button>
        </div>
        <div className="row">
          {filteredBooks.length === 0 ? (
            <div className="text-center fs-1 fw-bold">No data found</div>
          ) : (
            filteredBooks.map((book) => (
              <div key={book._id} className="col-md-4 mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-center fs-2 fw-bold">
                      {book.title}
                    </Card.Title>
                    <Card.Text>
                      {" "}
                      <span className="fs-5 fw-bold">Author:</span>
                      {book.author}
                    </Card.Text>
                    <Card.Text>
                      <span className="fs-5 fw-bold">Description:</span>{" "}
                      {book.description}
                    </Card.Text>
                    <Card.Text>
                      <span className="fs-5 fw-bold">Categories:</span>{" "}
                      {book.categories.join(", ")}
                    </Card.Text>
                    <Card.Text>
                      <span className="fs-5 fw-bold">Published date: </span>{" "}
                      {new Date(book.publishedDate).toLocaleDateString("en-US")}
                    </Card.Text>
                    <Card.Text>
                      <span className="fs-5 fw-bold">No. of Pages:</span>{" "}
                      {book.numberOfPages}
                    </Card.Text>
                    {/* <hr/>
                    <Card.Text className="text-center">
                    
                      {book.isAvailable ? <span className="test-center fs-5 text-success">Available</span>: <span className="test-center fs-5  text-danger">Not Available</span>}
                    </Card.Text> */}
                    <hr />
                    {isAdmin && (
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="danger mx-2"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </Button>
                        <Link to={`/update-book/${book._id}`}>
                          <Button
                            variant="success mx-2"
                            onClick={() => handleUpdate(book._id)}
                          >
                            Update
                          </Button>
                        </Link>
                      </div>
                    )}
                    {!isAdmin && (
                      <div>
                        {borrowedBooks.find((b) => b.id === book._id)
                          ?.isBorrowed ? (
                          <div className="d-flex justify-content-center">
                            <button className="btn btn-success mx-2 " disabled>
                              Borrowed
                            </button>
                            <button
                              onClick={() => handleReturn(book._id)}
                              className="btn btn-dark mx-2"
                            >
                              Return
                            </button>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-center">
                            <button
                              onClick={() => handleBorrow(book._id)}
                              className="btn btn-dark mx-2"
                            >
                              Borrow
                            </button>
                            <button className="btn btn-success mx-2" disabled>
                              Returned
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>
        <ReturnConfirmationPortal
          showPortal={showPortal}
          handleClosePortal={handleCancelReturn}
          handleReturn={handleConfirmReturn}
        />
      </div>
    </div>
  );
};

export default ShowBooks;
