import { React, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Expense } from "../Expense/Expense";
import { Income } from "../Income/Income";
import { Setting } from "../Setting/Setting";
import { History } from "../History/History";
import { Login } from "../Login/Login";

export const Menu = (props) => {
  const [expense, setExpense] = useState([]);

  const handleMenu = (menu) => {
    if (menu == "dashboard") {
      props.menuselected(<Dashboard />);
    } else if (menu == "transaction") {
      props.menuselected(<History />);
    } else if (menu == "income") {
      props.menuselected(<Income />);
    } else if (menu == "expense") {
      props.menuselected(<Expense setExpense={setExpense} />);
    } else if (menu == "setting") {
      props.menuselected(<Setting />);
    }else if (menu == "login") {
      props.menuselected(<Login />);
    }
  };
  return (
    <div className="flex flex-col p-4 ">
      {/* Main Menu Items */}
      <div>
        <ul className="flex flex-col h-full">
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("dashboard")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/dashboard.svg" alt="Dashboard Icon" />
            </span>
            Dashboard
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("transaction")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/transaction.svg" alt="Transaction Icon" />
            </span>
            View Transaction
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("income")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/income.svg" alt="Income Icon" />
            </span>
            Income
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer"
            onClick={() => handleMenu("expense")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/expense.svg" alt="Expense Icon" />
            </span>
            Expenses
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer mt-auto"
            onClick={() => handleMenu("setting")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/settings.svg" alt="Settings Icon" />
            </span>
            Settings
          </li>
          <li
            className="rounded-md p-2 flex border-2 border-transparent hover:border-slate-600 transition duration-300 cursor-pointer mt-auto bg-red-200 hover:bg-red-300"
            onClick={() => handleMenu("login")}
          >
            <span className="mr-4 w-5">
              <img src="/icons/login.svg" alt="Login Icon" />
            </span>
            Login/Signup
          </li>
        </ul>
      </div>
    </div>
  );
};
