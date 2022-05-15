import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container } from "react-bootstrap";
import BudgetCard from "./BudgetCard";
import ModalBudget from "./component/ModalBudget";
import ModalBelanja from "./component/ModalBelanja";

function Budget() {
  const [budget, setBudget] = useState([]);

  console.log("budget", budget);

  function getAllBudget() {
    axios
      .get("http://localhost:8000/api/budget")
      .then(function (response) {
        console.log("response", response);
        setBudget(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getAllBudget();
  }, []);

  return (
    <Container className="p-5">
      <div className="mb-3">
        <ModalBudget />
        <ModalBelanja budget={budget} />
      </div>

      <div className="d-flex flex-wrap w-100 m-auto justify-content-center">
        {budget.map((b) => {
          return (
            <BudgetCard
              key={b.id}
              id={b.id}
              name={b.name}
              amount={b.amount}
              cur_amount={b.cur_amount}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default Budget;
