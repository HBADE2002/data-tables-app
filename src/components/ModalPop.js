import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalPop({ show, onHide, rowData }) {
    return (
      <Modal show={show} onHide={onHide} centered backdrop="true" className="modal">
        <Modal.Header>
          <Modal.Title> <h2>Info on Row</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rowData ? (
            <>
              <h3>User Attributes:</h3>
              <ul>
                <li>Name: {rowData.name}</li>
                <li>Email: {rowData.email}</li>
                <li>Age: {rowData.age}</li>
                {/* Add more user attributes as needed */}
              </ul>
            </>
          ) : (
            <p>There is an error.</p>
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
  
  export default ModalPop;
  
