import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ShowBooks from "./pages/ShowBooks";
import Addbook from "./pages/Addbook";
import UpdateBook from "./pages/UpdateBook";
import "./App.css";
import BorrowingHistory from "./pages/BorrowingHistory";
import GlobalStyles from "./components/GlobalStyles";
import Footer from "./pages/Footer";
import UserBooks from "./pages/MyBorrowedBooks";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Authentication logic here to update isUserLoggedIn and isAdmin states
  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('token');
    const isAdminStored = localStorage.getItem('isAdmin');
    if (token) {
      // Token exists, set user as logged in
      setIsUserLoggedIn(true);
      // Add additional logic to validate the token if needed
    }
    if (isAdminStored) {
      // isAdmin value exists, set isAdmin state
      setIsAdmin(isAdminStored === 'true');
    }
  }, []);

  return (
    <div className="app-container">
      <GlobalStyles />
      <div className="background-image"></div>
      <Router>
        <NavbarComponent
          isUserLoggedIn={isUserLoggedIn}
          isAdmin={isAdmin}
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsAdmin={setIsAdmin}
        />
        
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isUserLoggedIn} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login setIsUserLoggedIn={setIsUserLoggedIn} setIsAdmin={setIsAdmin} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/books" element={<ShowBooks isAdmin={isAdmin} />} />
          {isAdmin && <Route path="/add-book" element={<Addbook />} />}
          <Route path="/update-book/:id" element={<UpdateBook />} />
          {!isAdmin && <Route path="/borrowing/history" element={<BorrowingHistory />} />}
          {!isAdmin && <Route path="/mycollection" element={<UserBooks/>} />}
        </Routes>

        <div><Footer/></div>
      </Router>
      
    </div>
  );
};

export default App;
