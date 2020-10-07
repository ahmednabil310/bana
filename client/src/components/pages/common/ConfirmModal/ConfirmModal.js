import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

//confirmData => {onConfirmClick, confirmButtonLabel, body, payload}
const ConfirmModal = ({ confirmData, setConfirmData }) => {

  const onModalHide = () => {
    setConfirmData('');
  }

  return (
    <Modal show={true} onHide={onModalHide} centered className="modal-primary" >
      <Modal.Header closeButton>
        <div className="mb-4">
          <Modal.Title>Confirm</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>

        <p>{confirmData.body}</p>

        <div className="d-flex justify-content-center pt-4">
          <Button className="mx-1" variant="outline-secondary" size="small" type="button" onClick={() => setConfirmData('')}>Cancel</Button>
          <Button className="mx-1" variant={confirmData.confirmButtonVariant} size="small" type="button" onClick={() => confirmData.onConfirmClick(confirmData.payload)}>{confirmData.confirmButtonLabel}</Button>
        </div>
      </Modal.Body>
    </Modal >
  )
}

export default ConfirmModal
