import React, { useEffect } from "react";
import cookie from "react-cookies";
import Chart from "chart.js/auto";
export const Charts = (props) => {
  useEffect(() => {
    let chartInstance = null; // Store the chart instance

    (async function () {
      const fetchIncome = cookie.load("incomes") ? cookie.load("incomes") : [];
      const fetchExpense = cookie.load("expenses")
        ? cookie.load("expenses")
        : [];
      const fetchCurrency = cookie.load("expense_currency")
        ? cookie.load("expense_currency")
        : [];
      const wholeData = [...fetchIncome, ...fetchExpense];

      const data = wholeData.map((income) => {
        return {
          date: new Date(income.selectedDate),
          income: income.type == "income" ? income.amount : 0,
          expense: income.type == "expense" ? income.amount : 0,
        };
      });
      // Destroy previous chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(document.getElementById("financialChart"), {
        type: props.chartUsed,
        data: {
          labels: data.map((row) => row.date.toLocaleDateString()), // Convert dates to string format
          datasets: [
            {
              label: "Income",
              data: data.map((row) => row.income),
              backgroundColor: "green", // Green color for income
              borderColor: "green",
              borderWidth: 1,
            },
            {
              label: "Expense",
              data: data.map((row) => row.expense),
              backgroundColor: "red", // Red color for expense
              borderColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: `{Amount ${fetchCurrency.currency}}`,
              },
              beginAtZero: true,
            },
          },
        },
      });
    })();

    // Cleanup function to destroy the chart when the component unmounts or updates
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [props]);
  return (
    <div>
      <canvas id="financialChart"></canvas>
    </div>
  );
};
