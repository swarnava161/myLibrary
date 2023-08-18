import React from 'react';
import { RiBookFill } from 'react-icons/ri';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="footer-item text-center">
              <div className="footer-icon">
                <RiBookFill />
              </div>
              <h4 className="my-2">My Library</h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="footer-item ">
              <div className="footer-icon text-center">
                <FaEnvelope />
              </div>
              <p className="my-2 text-center ">Email: mylibrary@gmail.com</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="footer-item text-center">
              <div className="footer-icon">
                <FaPhone />
              </div>
              <p className="my-2">Phone: +91 9163527619</p>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; 2023 Library Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
