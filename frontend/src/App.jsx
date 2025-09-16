import "./App.css";
import { useEffect } from "react";
import { Profile } from "./Components/Profile/Profile";
import { Menu } from "./Components/Menu/Menu";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { useState } from "react";
import cookie from "react-cookies";
import Typewriter from 'typewriter-effect';
import { Login } from "./Components/Login/Login";


function App() {
  const [dbstatus, setDbstatus] = useState(false);
  const [loginstatus, setLoginStatus] = useState(false);

  useEffect(() => {
    fetch('/api/checkDBconnection')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDbstatus(data.status === 'success');
      })
      .catch((err) => {
        setDbstatus(false);
      });


       const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")

        fetch("/api/verifyToken", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // attach token here
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            if (data.valid) {
              setLoginStatus(true);
              console.log("✅ Token valid, user:", data.user);
            } else {
              setLoginStatus(false);
              console.log("❌ Token invalid");
            }
          })
          .catch((err) => {
            setLoginStatus(false);
            console.error("Error:", err);
          });
  }, []);

  cookie.load("expense_currency")
    ? ""
    : cookie.save("expense_currency", JSON.stringify({ currency: "INR" }));

  const [menuSelected, setMenuSelected] = useState(<Dashboard />);
  const selectMenu = (menu) => {
    setMenuSelected(menu);
  };

  return (
    <div className="h-full flex p-6 bg-[url('finance.jpg')] bg-bottom">
       {!loginstatus && <div className="w-full flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl font-mono mb-8 text-white font-bold text-center drop-shadow-lg">
          Manage your finances with ease
        </h2>
       <Login dbstatus={dbstatus} loginStatus={setLoginStatus} />
      </div>
      }   
      {loginstatus && (
        <>
          <div className="h-dvh rounded-2xl m-4 border-solid border-4 border-white w-1/4 size-full p-4 bg-sky-50">
            <Profile />
            <Menu menuselected={selectMenu} loginStatus={loginstatus}/>
          </div>
          <div className="rounded-2xl m-4 border-solid border-4 border-white w-3/4 size-full p-4 bg-sky-50">
            {menuSelected}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
