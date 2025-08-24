import "./App.css";
import { Profile } from "./Components/Profile/Profile";
import { Menu } from "./Components/Menu/Menu";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { useState } from "react";
import cookie from "react-cookies";
import Typewriter from 'typewriter-effect';
import { Login } from "./Components/Login/Login";


function App() {
  cookie.load("expense_currency")
    ? ""
    : cookie.save("expense_currency", JSON.stringify({ currency: "INR" }));

  const [menuSelected, setMenuSelected] = useState(<Dashboard />);
  const selectMenu = (menu) => {
    setMenuSelected(menu);
  };
  return (
    <div className="h-full flex p-6 bg-gradient-to-br bg-[url('finance.jpg')] bg-bottom">
      <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-mono mb-8 text-white font-bold text-center drop-shadow-lg">
        Manage your finances with ease
      </h2>
      <Login />
    </div>
      {/* <div className="h-dvh rounded-2xl m-4 border-solid border-4 border-white w-1/4 size-full p-4b bg-sky-50">
        <Profile />
        <Menu menuselected={selectMenu} />
      </div>
      <div className="rounded-2xl m-4 border-solid border-4 border-white w-3/4 size-full p-4 bg-sky-50">
        {menuSelected}
      </div>  */}
    </div>
  );
}

export default App;
