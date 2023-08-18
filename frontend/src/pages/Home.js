// import React, { useRef, useState } from "react";
import './HomeStyle.css';

// import axios from "axios";

// import { useNavigate } from "react-router-dom";

const Home = () => {
  // const searchQueryInputRef = useRef(null);
  // const navigate = useNavigate();
  // const [searchResults, setSearchResults] = useState([]);
  // const [searchLength, setSearchLength] = useState(0);

  // const handleSearch = async () => {
  //   if (!isAuthenticated) {
  //     // Show popup or redirect to login page
  //     alert("Please log in to search for books.");
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const lengthResponse = await axios.get(
  //       `http://localhost:5000/api/books/length/${searchQuery}`
  //     );
  //     const uniqueResponse = await axios.get(
  //       `http://localhost:5000/api/books/${searchQuery}`
  //     );

  //     setSearchResults(uniqueResponse.data);
  //     setSearchLength(lengthResponse.data.length);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className=" text-white d-flex align-items-center justify-content-center"  style={{minHeight:"100vh"}}>
   
   <div className="container text-center">
      <h1 className="home-title">Welcome to <span className='text-warning'>My Library</span> </h1>
      <p className="home-description">
        Explore our collection of books and discover new reading adventures.
      </p>
      <p className="home-description">
        Enjoy the convenience of borrowing and returning books online.s
      </p>
    
        
        {/* <div className="search-container">
          <input
            type="text"
            placeholder="Search by book name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchQueryInputRef}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {Array.isArray(searchResults) && searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results:</h2>
            <p>Number of Books Available: {searchLength}</p>
            {searchResults.map((book) => (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                <p>Published Date: {book.publishedDate}</p>
                <p>Number of Pages: {book.numberOfPages}</p>
                <p>
                  Availability:{" "}
                  {book.isAvailable ? "Available" : "Not Available"}
                </p>
                <p>Categories: {book.categories.join(", ")}</p>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
