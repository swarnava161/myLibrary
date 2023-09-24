import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Inside the component

const UpdateBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    author: "",
    publishedDate: "",
    isAvailable: false,
    numberOfPages: "",
    categories: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );
        const book = response.data;
        setBookData(book);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, bookData);
      navigate('/books'); 
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="container text-white">
      <h2 className="text-center text-warning text-decoration-underline my-3">Update Book</h2>
      {Object.keys(bookData).length > 0 && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={bookData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="publishedDate">
            <Form.Label>Published Date</Form.Label>
            <Form.Control
              type="date"
              name="publishedDate"
              value={
                bookData.publishedDate
                  ? bookData.publishedDate.slice(0, 10)
                  : ""
              }
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="isAvailable">
            <Form.Check
              type="checkbox"
              label="Is Available"
              checked={bookData.isAvailable}
              onChange={() =>
                setBookData((prevData) => ({
                  ...prevData,
                  isAvailable: !prevData.isAvailable,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="numberOfPages">
            <Form.Label>Number of Pages</Form.Label>
            <Form.Control
              type="number"
              name="numberOfPages"
              value={bookData.numberOfPages}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="categories">
            <Form.Label>Categories</Form.Label>
            <Form.Control
              type="text"
              name="categories"
              value={bookData.categories}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn btn-success my-2">
            Update Book
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateBook;
