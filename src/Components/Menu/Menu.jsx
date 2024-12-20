import { React, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Expense } from "../Expense/Expense";
import { Income } from "../Income/Income";
import { Transaction } from "../Transaction/Transaction";
import { Setting } from "../Setting/Setting";
import cookie from "react-cookies";
export const Menu = (props) => {
  const [expense, setExpense] = useState([]);
  const currentCurrency = cookie.load("expense_currency");

  const handleMenu = (menu) => {
    if (menu == "dashboard") {
      props.menuselected(<Dashboard currency={currentCurrency} />);
    } else if (menu == "transaction") {
      props.menuselected(<Transaction />);
    } else if (menu == "income") {
      props.menuselected(<Income currency={currentCurrency} />);
    } else if (menu == "expense") {
      props.menuselected(
        <Expense currency={currentCurrency} setExpense={setExpense} />
      );
    } else if (menu == "setting") {
      props.menuselected(<Setting />);
    }
  };
  return (
    <div className="flex flex-col p-4">
      {/* Main Menu Items */}
      <div>
        <ul>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("dashboard")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/dashboard.svg" alt="My Icon" />
            </span>
            Dashboard
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("transaction")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/transaction.svg" alt="My Icon" />
            </span>
            View Transaction
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("income")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/income.svg" alt="My Icon" />
            </span>
            Income
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("expense")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/expense.svg" alt="My Icon" />
            </span>
            Expenses
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("setting")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/settings.svg" alt="My Icon" />
            </span>
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
};
