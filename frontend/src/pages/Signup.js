import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !password || !confirmPassword) {
    setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Check if admin user already exists
      if (role === 'admin') {
        const response = await axios.get('http://localhost:5000/signup/admin-exists');
        console.log(response);
        if (response.data.exists) {
          setErrorMessage('Admin user already exists');
          return;
        }
      }

      // Send sign up request to the server
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
        confirmPassword,
        role,
      });

      // Handle success response
      console.log(response.data);
      // Optionally, redirect to a success page or show a success message

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      // Handle error response
      console.error(error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Sign up failed');
      }
    }
  };

  return (
    <div>
    {/* <div className="signup-container "></div> */}
    <div className="container">
      <div className="row justify-content-center ">
        <div className="col-lg-6 "style={{paddingTop:"60px"}}>
          <div className="card  " >
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
              <form onSubmit={handleSignup}>
                <div className="form-group p-2">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group p-2">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group p-2">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group p-2">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group p-2">
                  <label htmlFor="role">Role:</label>
                  <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark btn-block m-2">Sign Up</button>
              </form>
              <p className="text-center mt-3">Already have an account? <Link to="/login">Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Signup;
