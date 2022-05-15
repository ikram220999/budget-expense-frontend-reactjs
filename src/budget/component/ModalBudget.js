import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";

function ModalBudget() {
  const [show, setShow] = useState(false);
  const [bajet, setBajet] = useState({
    name: "",
    amount: 0,
  });
  const [create, setCreate] = useState(false);

  console.log(bajet);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/budget", {
        name: bajet.name,
        amount: bajet.amount,
        cur_amount: 0,
      })
      .then(function (response) {
        setBajet({
          name: "",
          amount: 0,
        });
        setShow(false);
        setCreate(!create);
        console.log("cipta bajet", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return {
    create,
    render: (
      <>
        <Button className="bg-primary border-0 mx-1" onClick={handleShow}>
          + Bajet
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bajet Baru</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={bajet.name}
                onChange={(e) => setBajet({ ...bajet, name: e.target.value })}
              ></Form.Control>
              <br />
              <Form.Label>Had Bajet</Form.Label>
              <Form.Control
                type="text"
                value={bajet.amount}
                onChange={(e) => setBajet({ ...bajet, amount: e.target.value })}
              ></Form.Control>
              <br />

              <Button type="submit" onClick={handleSubmit}>
                Simpan
              </Button>
            </FormGroup>
          </Modal.Body>
        </Modal>
      </>
    ),
  };
}

export default ModalBudget;
