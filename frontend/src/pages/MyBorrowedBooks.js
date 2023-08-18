import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import ReturnConfirmationPortal from './ReturnConfirmationPortal';

const UserBooks = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [showPortal, setShowPortal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const fetchUserBooks = async () => {

      try {
        const userEmailId= localStorage.getItem('userEmailId');
        console.log("in my borrow function i get the user email id",userEmailId);
        const response = await axios.get(`http://localhost:5000/books/returned/${userEmailId}`); // Replace with the actual user's email
        setUserBooks(response.data.books);
        
      
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserBooks();
  }, [rerender]);
//   const returnBookId= response.data.books[0].bookId;
console.log(userBooks);

const handleReturn = (bookId) => {
    console.log(bookId);
    setSelectedBookId(bookId);
    setShowPortal(true);
  };


  
  const handleConfirmReturn = async () => {
    try {
      // Perform return operation and update borrowedBooks
      console.log("Returning book with ID:", selectedBookId);
  
      // Find the book object in userBooks array with the selectedBookId
      const book = userBooks.find((book) => book.bookId === selectedBookId);
      
      if (!book) {
        console.error("Book not found in userBooks array");
        return;
      }
  
      // Update the return date for that book object of the user
      await axios.put(`http://localhost:5000/borrowing/return/${selectedBookId}`, {
        returnDate: new Date(),
      });
  
      // Update the isBorrowed status for the clicked book
      const updatedUserBooks = userBooks.map((book) =>
        book._id === selectedBookId ? { ...book, isBorrowed: false } : book
      );
      setUserBooks(updatedUserBooks);
  
      // Remove the borrowed book ID from local storage
      localStorage.removeItem(selectedBookId);
      setShowPortal(false);
      setRerender(prevRerender => !prevRerender);
    } catch (error) {
      console.error("Error in handleConfirmReturn:", error);
      // Handle error, e.g., show an error message or update UI
    }
  };

  const handleCancelReturn = () => {
    
    setShowPortal(false);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
    {userBooks.length > 0 ? (
      <Container className="my-5 p-2">
        <Row>
          {userBooks.map((book) => (
            <Col key={book._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title className="fs-4 fw-bold py-2 text-center">{book.book.title}</Card.Title>
                  <Card.Text><span className="fs-5 fw-bold py-2">Author:</span> {" "}{book.book.author}</Card.Text>
                  <Card.Text><span className="fs-5 fw-bold py-2">Borrowing Date:</span> {" "} {new Date(book.borrowedDate).toLocaleDateString('en-US')}</Card.Text>
                  <Card.Text><span className="fs-5 fw-bold py-2">Return Date:</span> {"     "}--</Card.Text>
                  <Button
                    className="btn btn-success p-2 my-2"
                    onClick={() => handleReturn(book.bookId)}
                  >
                    Return
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    ) : (
      <div className="text-center text-white fs-1 fw-bold d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}> No Borrowed Books Found</div>
    )}
    <ReturnConfirmationPortal
      showPortal={showPortal}
      handleClosePortal={handleCancelReturn}
      handleReturn={handleConfirmReturn}
    />
  </div>
);
};

export default UserBooks;
