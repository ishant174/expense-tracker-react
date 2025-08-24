import React, { useContext, useEffect, useState, useRef } from "react";
import { Card } from "../Card/Card";
import { Transaction } from "../Transaction/Transaction";
import cookie from "react-cookies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Income.css";
import Price from "../Price/Price";
export const Income = (props) => {
  const fetchCUrrency = cookie.load("expense_currency");
  const fetchIncome = cookie.load("incomes");
  const inputDate = useRef(new Date());
  const [totalIncome, setTotalIncome] = useState(0);
  const [startDate, setStartDate] = useState();
  const [income, setIncome] = useState(fetchIncome ? fetchIncome : []);
  const [formData, setFormData] = useState();
  
  const deleteIncome = (incomeID) => {
    const newIncome = income.filter((eachIncome) => eachIncome.id != incomeID);
    setIncome(newIncome);
  };
  const handleIncomeChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddIncome = (e) => {
    e.preventDefault();
    const now = new Date();

    const newIncome = {
      ...formData,
      selectedDate: startDate,
      type: "income",
      id: Date.now() + Math.floor(Math.random() * 1000), // Generates a simple unique ID
      createdTime: `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    };

    setIncome((prevIncome) => {
      return [...prevIncome, newIncome];
    });
  };
  const handleDateChange = (date, type) => {
    setStartDate(date);
  };
  useEffect(() => {
    let fullIncome = 0;
    income.map((newIncome) => {
      fullIncome += parseInt(newIncome.amount);
    });
    setTotalIncome(fullIncome);
    cookie.save("incomes", JSON.stringify(income));
  }, [income]);
  return (
    <div>
      <h2 className="text-3xl font-mono text-left">Income</h2>
      <Card className="text-center">
        <h2 className="text-3xl text-sky-800">
          Total Income:
          <span className="text-4xl font-bold">
            {totalIncome === 0 ? (
              <span className="">
                <Price currency={fetchCUrrency ? fetchCUrrency.currency : ""} amount={totalIncome}/>
            
              </span>
            ) : totalIncome > 0 ? (
              <span className=" text-lime-500">
                <Price currency={fetchCUrrency ? fetchCUrrency.currency : ""} amount={totalIncome}/>
              
              </span>
            ) : totalIncome < 0 ? (
              <span className=" text-red-500">
                <Price currency={fetchCUrrency ? fetchCUrrency.currency : ""} amount={totalIncome}/>
              </span>
            ) : (
              ""
            )}
          </span>
        </h2>
      </Card>
      <div className="flex gap-4 columns-2 mt-10">
        <Card className="w-3/12">
          <div className=" bg-transparent ">
            <form className="addIncome" onSubmit={handleAddIncome}>
              <h3 className="text-3xl text-center mb-5">Add Income</h3>

              <input
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="title"
                placeholder="Income Title"
                onChange={handleIncomeChange}
                required
              />
              <input
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                name="amount"
                placeholder="Income Amount"
                step="0.01"
                onChange={handleIncomeChange}
                required
              />
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, "date")}
                placeholderText="Select a Date"
                showTimeSelect
                name="date"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />

              <select
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-state"
                name="category"
                onChange={handleIncomeChange}
                required
              >
                <option>Select Category</option>
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <textarea
                className="appearance-none block w-full bg-white rounded-xl text-gray-700 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Add a Reference"
                name="description"
                onChange={handleIncomeChange}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-lg shadow hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2"
              >
                + Add Income
              </button>
            </form>
          </div>
        </Card>
        <Card className="w-9/12 text-center">
          {income.length > 0
            ? income.map((transaction) => {
                return (
                  <Card className="mb-3 bg-white" key={transaction.id}>
                    <Transaction
                      type="income"
                      income={transaction}
                      deleteIncome={deleteIncome}
                    />
                  </Card>
                );
              })
            : "No Transaction Found!"}
        </Card>
      </div>
    </div>
  );
};
