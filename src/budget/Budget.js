import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import BudgetCard from "./BudgetCard";
import ModalBudget from "./component/ModalBudget";
import ModalBelanja from "./component/ModalBelanja";
import { ReactDOM } from "react";

function Budget() {
  const [budget, setBudget] = useState([]);
  const { create, render } = ModalBudget();
  const { createExpense, renderBelanja } = ModalBelanja();
  console.log("create", create);
  console.log("create expense", createExpense);

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

  function allBudgetCard() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  useEffect(() => {
    getAllBudget();
  }, []);

  useEffect(() => {
    getAllBudget();
  }, [create]);

  useEffect(() => {
    getAllBudget();
    allBudgetCard();
  }, [createExpense]);

  return (
    <Container className="p-5">
      <div className="mb-3">
        {/* <ModalBudget /> */}
        {render}
        {renderBelanja}
      </div>

      {allBudgetCard()}
    </Container>
  );
}

export default Budget;
