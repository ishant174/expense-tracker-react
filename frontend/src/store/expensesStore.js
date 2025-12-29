// src/store/useCartStore.js
import { create } from "zustand";
import cookie from "react-cookies";
const fetchIncome = cookie.load("incomes") || [];
const fetchExpense = cookie.load("expenses") || [];

const calcTotal = (list) => {
  if (!list) return 0;
  if (Array.isArray(list)) {
    return list.reduce((sum, item) => sum + Number(item?.amount ?? item ?? 0), 0);
  }
  return Number(list?.amount ?? list ?? 0);
};

const initialTotalIncome = calcTotal(fetchIncome);
const initialTotalExpense = calcTotal(fetchExpense);


const expensesStore = create((set) => ({
  totalIncome: initialTotalIncome,
  totalExpense: initialTotalExpense,

  setTotalIncome: (totalIncome) => set({ totalIncome }),
  setTotalExpense: (totalExpense) => set({ totalExpense }),

    getBalance: () => {
        const { totalIncome, totalExpense } = expensesStore.getState();
        return totalIncome - totalExpense;
    },
}));

export default expensesStore;
