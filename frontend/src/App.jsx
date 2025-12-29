import "./App.css";
import { useEffect } from "react";
import { Profile } from "./Components/Profile/Profile";
import { Menu } from "./Components/Menu/Menu";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { useState } from "react";
import cookie from "react-cookies";
import { Login } from "./Components/Login/Login";
import Draggable from 'react-draggable';
import expensesStore from "./store/expensesStore";



function App() {
  const [dbstatus, setDbstatus] = useState(false);
  const [loginstatus, setLoginStatus] = useState(false);
  const balance = expensesStore(
    (state) => state.totalIncome - state.totalExpense
  );
  console.log(balance);

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
       {!loginstatus && <div className="w-full flex-1 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-4xl font-mono mb-8 text-white font-bold text-center drop-shadow-lg">
          Manage your finances with ease
        </h2>
       <Login dbstatus={dbstatus} loginStatus={setLoginStatus} />
      </div>
      }   
      {loginstatus && (
        <>
          {/* Top Right Banner Card */}
          <Draggable
            handle=".handle" // Only drag when grabbing this class (optional, see below)
            defaultPosition={{
              x: window.innerWidth - 300,   // 50px margin from right
              y: window.innerHeight - 150,  // 50px margin from bottom (adjust as needed)
            }} // Start top-right-ish
            bounds="parent" // Optional: keep it inside the screen/container
          >
            <div className="absolute z-50  shadow-xl shadow-white/40 ring-1 ring-white/60 rounded-xl"> {/* absolute + high z-index to float */}
              <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 text-xl font-medium text-gray-800 border-4 border-white cursor-move handle">
                Balance Left : {balance}
              </div>
              
            </div>
          </Draggable>
          <div className="min-h-screen rounded-2xl m-4 border-solid border-4 border-white w-1/4 size-full p-4 bg-sky-50">
            <Profile />
            <Menu menuselected={selectMenu} loginStatus={loginstatus}/>
          </div>
          <div className="w-full flex flex-col m-4">
            <div className="rounded-2xl  border-solid border-4 border-white w-full size-full p-4 bg-sky-50">
              {menuSelected}
            </div>
          </div>

          
        </>
      )}
    </div>
  );
}

export default App;
