import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const BorrowingHistory = () => {
  const [borrowingHistory, setBorrowingHistory] = useState([]);

  useEffect(() => {
    const fetchBorrowingHistory = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get the user ID from local storage
        const response = await axios.get(
          `http://localhost:5000/borrowing/history/${userId}`
        );

        setBorrowingHistory(response.data.borrowings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBorrowingHistory();
  }, []);

  return (
    <div className="container" style={{minHeight:"100vh"}}>
      <h1 className="text-center text-white fw-bold my-3 text-decoration-underline ">
        Borrowing History
      </h1>
      {borrowingHistory.length === 0 ? (
        <div className="text-center text-white fw-bold fs-5 my-5 ">
          No borrowing history found.
        </div>
      ) : (
        <Table striped bordered hover className="rounded-3 my-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>

              <th>Borrowed Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowingHistory.map((borrowing) =>
              borrowing.books.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.book.title}</td>
                  <td>{book.book.author}</td>
                  <td>
                    {new Date(book.borrowedDate).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    {book.returnDate
                      ? new Date(book.returnDate).toLocaleDateString("en-US")
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default BorrowingHistory;
