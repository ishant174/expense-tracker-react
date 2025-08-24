// hooks/useUniversalState.js
import { useState } from "react";

// Custom Hook to manage a global variable
const useUniversalIncome = () => {
  const [universalIncome, setUniversalIncome] = useState(0);

  // Function to update the state
  const updateUniversalIncome = (newValue) => {
    setUniversalIncome(newValue);
  };

  // Return the state and function to update it
  return [universalIncome, updateUniversalIncome];
};

export default useUniversalIncome;
