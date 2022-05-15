import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";

function ModalBelanja(props) {
  const [show, setShow] = useState(false);
  const [bajet, setBajet] = useState([]);

  let baajet = [];

  console.log("asd", bajet);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function setBajet() {
    for (let i = 0; i < props.budget.length(); i++) {
      //
    }
  }

  useEffect(() => {
    setBajet(props.budget);
  }, [show]);

  return (
    <>
      <Button
        className="bg-white border-secondary mx-1 text-secondary"
        onClick={handleShow}
      >
        + Belanja
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bajet Baru</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" value={""} onChange={""}></Form.Control>
            <br />
            <Form.Select aria-label="Default select example">
              {/* <option>Pilih Bajet</option> */}
              {bajet.map((b) => {
                <option value={b.id}>{b.name}</option>;
              })}
            </Form.Select>
            <br />

            <Button type="submit" onClick={handleSubmit}>
              Simpan
            </Button>
          </FormGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalBelanja;
