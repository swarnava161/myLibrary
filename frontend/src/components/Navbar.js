import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FiUser } from 'react-icons/fi';
import { BiBook } from 'react-icons/bi';
import "./Navbar.css";

const NavbarComponent = ({ isUserLoggedIn, isAdmin, setIsUserLoggedIn, setIsAdmin}) => {

  const [shouldShowInitialsOnly, setShouldShowInitialsOnly] = useState(false);
  const Navigate= useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setShouldShowInitialsOnly(window.innerWidth <= 1000);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');

  // Update user login status and role
  setIsUserLoggedIn(false);
  setIsAdmin(false);
     Navigate("/");

  };
  const userEmailId= localStorage.getItem('userEmailId');

  const renderProfileIcon = () => {
    if (isUserLoggedIn) {
      
      const initials = userEmailId.charAt(0).toUpperCase();
      const displayName = !shouldShowInitialsOnly ? initials : userEmailId;
      return !shouldShowInitialsOnly?<div className=" bg-light text-dark btn mx-2 px-2 fs-5 text-center" style={{height:"40px", width:"40px", borderRadius:"50%"}}>{displayName}</div>:<div className="text-white">{displayName}</div>
    } else {
      return (
        <Link to="/login" className="navbar-link fs-5 text-white">
        <div><FiUser className="profile-icon mx-2" /> </div>
        </Link>
      );
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="p-2">
      <Navbar.Brand as={Link} to="/" className="px-3 fs-3 " style={{fontFamily:"Helvetica"}}>
        <span><BiBook/></span>{" "}<span className="text-warning" style={{textShadow:"5px 5px 4px rgba(255, 255, 255,0.5)"}}>My Library</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="fs-5" style={{marginLeft:"auto"}}>
          <Nav.Link as={NavLink} to="/" exact="true" activeclassname="active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about" activeclassname="active">
            About
          </Nav.Link>
          {isUserLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/books" activeclassname="active">
                Show Books
              </Nav.Link>
              {isAdmin && (
                <Nav.Link as={NavLink} to="/add-book" activeclassname="active">
                  Add Book
                </Nav.Link>
              )}
               {!isAdmin && (
                <Nav.Link as={NavLink} to="/borrowing/history" activeclassname="active">
                 Borrowing History
                </Nav.Link>
              )}
              {!isAdmin && (
                <Nav.Link as={NavLink} to="/mycollection" activeclassname="active">
                 My collection
                </Nav.Link>
              )}
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
          {!isUserLoggedIn && (
            <>
              <Nav.Link as={NavLink} to="/login" activeclassname="active">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup" activeclassname="active">
                Sign Up
              </Nav.Link>
            </>
          )}
           {renderProfileIcon()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
