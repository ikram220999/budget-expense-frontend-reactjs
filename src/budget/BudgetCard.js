import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Form,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import "../budget/component/budjetcard.css";

function BudgetCard(props) {
  let name = props.name;
  const [curAmount, setCurAmount] = useState(parseFloat(props.cur_amount));
  let max_amount = props.amount;
  let id = props.id;
  let cur_amount = props.cur_amount;

  const [show, setShow] = useState(false);
  const [belanja, setBelanja] = useState({
    name: "",
    amount: "",
    budget_id: id,
  });
  const [expense, setExpense] = useState([]);

  //   console.log("belanja", belanja);
  //   console.log("cur amount", curAmount);
  //   console.log("expense", expense);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function progressColor(cur_amount, max_amount) {
    let percent = (cur_amount / max_amount) * 100;
    let colorr;

    if (percent < 40) {
      colorr = "primary";
    } else if (percent < 80) {
      colorr = "warning";
    } else if (percent >= 80) {
      colorr = "danger";
    }
    return colorr;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/expense", {
        name: belanja.name,
        amount: belanja.amount,
        budget_id: belanja.budget_id,
      })
      .then(function (response) {
        console.log("berjaya simpan", response);
        setBelanja({
          name: "",
          amount: "",
        });

        setShow(false);
        setCurAmount(parseFloat(curAmount) + parseFloat(belanja.amount));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function getbyId() {
    axios
      .get(`http://localhost:8000/api/budget/${id}`)
      .then(function (response) {
        // console.log("by id", response);
        setExpense(response.data.expense);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getbyId();
  }, [id]);

  return (
    <Card className="p-3 m-3 bajetcard">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah belanja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              value={belanja.name}
              onChange={(e) => setBelanja({ ...belanja, name: e.target.value })}
            ></Form.Control>
            <br />
            <Form.Label>Jumlah belanja</Form.Label>
            <Form.Control
              type="text"
              value={belanja.amount}
              onChange={(e) =>
                setBelanja({ ...belanja, amount: e.target.value })
              }
            ></Form.Control>
            <br />

            <Button type="submit" onClick={handleSubmit}>
              Simpan
            </Button>
          </FormGroup>
        </Modal.Body>
      </Modal>

      <Button className="" onClick={handleShow}>
        <small>+ Belanja</small>
      </Button>
      <div className="p-2 d-flex flex-row align-items-baseline justify-content-between">
        <h6>{name[0].toUpperCase() + name.substring(1)}</h6>
        <div>
          <small>RM{curAmount}</small> /{" "}
          <small>
            <b>RM{max_amount}</b>
          </small>
        </div>
      </div>
      <ProgressBar
        variant={progressColor(cur_amount, max_amount)}
        now={curAmount}
        max={max_amount}
      />

      <Accordion className="mt-3 border-0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Senarai belanja</Accordion.Header>
          <Accordion.Body>
            {expense.map((ex, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-row justify-content-between"
                >
                  <small>
                    {ex.name[0].toUpperCase() + ex.name.substring(1)}
                  </small>
                  <small>
                    <b>RM {ex.amount}</b>
                  </small>
                </div>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
}

export default BudgetCard;
