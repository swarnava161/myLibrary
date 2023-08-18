import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';

const ReturnConfirmationPortal = ({ showPortal, handleClosePortal, handleReturn }) => {
  return ReactDOM.createPortal(
    <Modal show={showPortal} onHide={handleClosePortal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to return this book?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePortal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleReturn}>
          Return
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById('portal-root')
  );
};

export default ReturnConfirmationPortal;
