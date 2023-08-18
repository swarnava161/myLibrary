import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css";

const Login = ({ setIsUserLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
        role
      });

      const token = response.data.token; // Assuming the token is present in the response as 'token'
      const isAdmin = response.data.isAdmin;
      const userId= response.data.user._id;
      const userEmailId=response.data.user.email;
      // console.log(userId);
      // console.log(isAdmin);
      // Store the token in localStorage
      localStorage.setItem('userEmailId',userEmailId);
      console.log("user email id is",userEmailId);
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('userId',userId);
      const userIdd=localStorage.getItem('userId');
      console.log("user id is",userIdd);
      
      console.log(isAdmin)
      console.log(token)
      // Handle success response
      console.log(response.data);
      // Optionally, store user authentication token or redirect to a protected route

      // Update user login status and role
      setIsUserLoggedIn(true);
      setIsAdmin(role === 'admin');

      // Redirect to home page
      navigate('/');
    } catch (error) {
      // Handle error response
      console.error(error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Login failed');
      }

      // Check if user doesn't exist
      if (error.response && error.response.status === 404) {
        // Navigate to signup page
        navigate('/signup');
        // Show alert message
        alert('User does not exist. Please sign up.');
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <div className="card" >
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Log In</h2>
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                  <div className="form-group p-2">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group p-2">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="form-group p-2">
                  <label htmlFor="role">Role:</label>
                  <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                  <button type="submit" className="btn btn-dark btn-block m-2">Log In</button>
                </form>
                <p className="text-center mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
