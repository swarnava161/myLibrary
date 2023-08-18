import React, { useReducer } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const initialState = {
  title: "",
  author:"",
  description:"",
  publishedDate:"",
  numberOfPages:"",
  isAvailable:true,
  categories:""
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'TOGGLE_CHECKBOX':
      return {
        ...state,
        isAvailable: !state.isAvailable
      };
    default:
      return state;
  }
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Addbook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const capitalizedValue =
      id === 'author' || id === 'title' || id === 'categories'
      // id==="title"
        ? capitalizeFirstLetter(value)
        : value;
        console.log(capitalizedValue);
    dispatch({
      type: 'CHANGE_FIELD',
      field: id,
      value: capitalizedValue
    });
  };

  const handleCheckboxChange = () => {
    console.log(state);
    dispatch({ type: 'TOGGLE_CHECKBOX' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        ...state,
        isAvailable: state.isAvailable ? true : false
      };

      const response = await axios.post('http://localhost:5000/api/books', bookData);
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
    <div className="container">
      <h2 className='text-center text-warning text-decoration-underline my-3'>Add any Book</h2>
      <Form onSubmit={handleSubmit} className=' text-white rounded px-5 py-2 my-3 'style={{background:"#000000a3"}}>
        <Form.Group controlId="title ">
          <Form.Label className='my-2'>Title</Form.Label>
          <Form.Control
            type="text"
            className='p-2'
            placeholder="Enter title"
            value={state.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label className='my-2'>Author</Form.Label>
          <Form.Control
            type="text"
            className='p-2'
            placeholder="Enter author"
            value={state.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label className='my-2'>Description</Form.Label>
          <Form.Control
            as="textarea"
            className='p-2'
            rows={3}
            placeholder="Enter description"
            value={state.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="publishedDate">
          <Form.Label className='my-2'>Published Date</Form.Label>
          <Form.Control
            type="date"
            className='p-2'
            value={state.publishedDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="numberOfPages">
          <Form.Label className='my-2'>Number of Pages</Form.Label>
          <Form.Control
            type="number"
            className='p-2'
            placeholder="Enter number of pages"
            value={state.numberOfPages}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="isAvailable">
          <Form.Check
            type="checkbox"
            className='p-2'
            label="Is Available"
            checked={state.isAvailable}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Form.Group controlId="categories">
          <Form.Label className='my-2'> Categories</Form.Label>
          <Form.Control
            type="text"
            className='p-2'
            placeholder="Enter categories"
            value={state.categories}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='btn btn-dark my-3 p-2'>
          Add Book
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default Addbook;
