import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";

function ModalBelanja(props) {
  const [show, setShow] = useState(false);
  const [bajet, setBajet] = useState([]);
  const [createExpense, setCreateExpense] = useState(false);

  const [input, setInput] = useState({
    name: "",
    option: "",
    amount: 0,
  });

  console.log("asd", bajet);
  console.log("input", input);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/expense", {
        name: input.name,
        budget_id: input.option,
        amount: input.amount,
      })
      .then(function (response) {
        console.log("success expense ", response);

        setInput({
          name: "",
          option: "",
          amount: 0,
        });

        setShow(false);
        setCreateExpense(!createExpense);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function settingBajet() {
    axios
      .get("http://localhost:8000/api/budget")
      .then(function (response) {
        console.log("response", response);
        setBajet(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    settingBajet();
  }, [show]);

  return {
    createExpense,
    renderBelanja: (
      <>
        <Button
          className="bg-white border-secondary mx-1 text-secondary"
          onClick={handleShow}
        >
          + Belanja
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Belanja Baru</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Form.Label>Bajet</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setInput({ ...input, option: e.target.value })}
              >
                <option>Pilih Bajet</option>
                {bajet.map((b) => (
                  <option value={b.id}>{b.name}</option>
                ))}
              </Form.Select>
              <br />
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={input.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              ></Form.Control>
              <br />
              <Form.Label>Jumlah Belanja</Form.Label>
              <Form.Control
                type="text"
                value={input.amount}
                onChange={(e) => setInput({ ...input, amount: e.target.value })}
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

export default ModalBelanja;
