import React from 'react';
import Modal from 'react-bootstrap/Modal';

function SmallModal({ show, onHide, content }) {
  return (
      <Modal
        size="sm"
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-sm">
      <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
              Delivery Instructions
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
}

export default SmallModal;