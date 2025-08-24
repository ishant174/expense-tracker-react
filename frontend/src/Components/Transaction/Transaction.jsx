import React from "react";
import cookie from "react-cookies";
import Price from "../Price/Price";
export const Transaction = (props) => {
  const fetchCUrrency = cookie.load("expense_currency");
  const type = props.type;
  let incometype;
  if (type == "income") {
    incometype = props.income;
  } else if (type == "expense") {
    incometype = props.expense;
  }
  const selectedDate = new Date(incometype.selectedDate);
  return (
    <div className="flex">
      <div className="w-1/5 ">
        {type == "expense" ? (
          <img src="/expenses.png" alt="Expense Icon" />
        ) : (
          <img src="/income.png" alt="Income Icon" />
        )}
      </div>
      <div className="w-3/5 flex flex-col ">
        <div className="text-2xl">{incometype.title}</div>
        <div className="flex gap-4">
          <div
            className={`${
              type == "income" ? "text-lime-500" : "text-red-800"
            } text-2xl font-medium`}
          >
            <Price currency={fetchCUrrency ? fetchCUrrency.currency : ""} amount={incometype.amount}/>
          </div>
          <div>{selectedDate.toLocaleString()}</div>
          <div>{incometype.description}</div>
        </div>
      </div>
      <div className="w-1/5 flex justify-end ">
        <button
          onClick={() =>
            type == "income"
              ? props.deleteIncome(incometype.id)
              : props.deleteExpense(incometype.id)
          }
        >
          <img src="/delete.png" alt="Delete Icon" />
        </button>
      </div>
    </div>
  );
};
