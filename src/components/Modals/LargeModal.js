import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LargeModal({ show, onHide, orderDetails, totalAmount }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderDetails && orderDetails.length > 0 ? (
          <div>
            <h5>Items Ordered:</h5>
            <ul>
              {orderDetails.map((item, index) => (
                <li key={index}>
                  {item.menu.item_name} - {item.quantity} x Rs.{item.price} = Rs.{item.quantity * item.price}
                </li>
              ))}
            </ul>
            <h5>Total Amount: Rs.{totalAmount}</h5>
          </div>
        ) : (
          <p>No orders found for this delivery.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LargeModal;