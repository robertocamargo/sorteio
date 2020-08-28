import React from 'react';
import { Modal } from 'react-bootstrap';
// import { Container } from './styles';

function Popup({ show, ShowClose, ganhador }) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={ShowClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          <h2>Ganhador</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 style={{ color: 'red' }}>{ganhador}</h1>
      </Modal.Body>
    </Modal>
  );
}

export default Popup;
