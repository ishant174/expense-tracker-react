import React, { useState } from "react";
import "./Login.css";
import {
  toast,
  Bounce,
  ToastContainer,
  Slide,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = (props) => {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
     const [rememberDevice, setRememberDevice] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        console.log(isLogin)
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        if (!isLogin) {
            if (!firstName || !lastName) {
                setError("Please enter your first and last name.");
                return;
            }
            if (!confirmPassword) {
                setError("Please confirm your password.");
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            if (onSignup) {
                const data = {
                    firstName,
                    lastName,
                    email,
                    password
                }
                onSignup(data);
            }


        } else {
            if (onLogin) {
                onLogin({ email, password ,rememberDevice});
            }
        }
    };
    const onSignup = async (data) => {
        console.log("Signup data:", data);
        const response = await fetch("/api/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result)
        if(response.status !== 200){
            setError(result.message || "Signup failed. Please try again.");
            return;
        }else{
            console.log("Signup successful");
            toast.success(`Successfully signup`, {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
        console.log("✅ Server Response:", result);
        // Implement signup logic here (e.g., API call)
    };
    const onLogin = async (data) => {
        console.log("Login data:", data);       
         const response = await fetch("/api/loginUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result)
         if(response.status !== 200){
            setError(result.message || "Signup failed. Please try again.");
            return;
        }else{
            
            toast.success(`Welcome ${result.user.firstName}`, {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
            localStorage.setItem("token", result.user.token); 
             setIsLogin(true);
             props.loginStatus(isLogin);
             
        }
               
    }

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
    };

    return (
        <div className="w-full flex items-end justify-center bg-transparent">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 loginsignup-card">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-gray-700 mb-1">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    disabled={props.dbstatus ? "": "disabled"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 mb-1">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    disabled={props.dbstatus ? "": "disabled"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <label htmlFor="login-email" className="block text-gray-700 mb-1">
                            Email:
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            disabled={props.dbstatus ? "": "disabled"}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-gray-700 mb-1">
                            Password:
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete={isLogin ? "current-password" : "new-password"}
                            disabled={props.dbstatus ? "": "disabled"}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                     {isLogin && (
                        <div className="flex items-center">
                            <input
                                id="remember-device"
                                type="checkbox"
                                checked={rememberDevice}
                                onChange={(e) => setRememberDevice(e.target.checked)}
                                disabled={props.dbstatus ? "" : "disabled"}
                                className="mr-2"
                            />
                            <label htmlFor="remember-device" className="text-gray-700 select-none">
                                Don't ask again for this device
                            </label>
                        </div>
                    )}
                    {!isLogin && (
                        <div>
                            <label htmlFor="signup-confirm-password" className="block text-gray-700 mb-1">
                                Confirm Password:
                            </label>
                            <input
                                id="signup-confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                disabled={props.dbstatus ? "": "disabled"}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}
                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}
                    {!props.dbstatus && (<div className="text-red-600 text-sm text-center">Database connection is not active. Please try again later.</div>)}
                    <button
                        type="submit"
                        className="w-full bg-[#95B8D4] text-white py-2 rounded hover:bg-[#658CAC] transition font-semibold"
                    disabled={props.dbstatus ? "": "disabled"}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    {isLogin ? (
                        <span className="text-gray-600">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                
                                className="text-[#95B8D4] hover:underline font-bold"
                            >
                                Sign Up
                            </button>
                        </span>
                    ) : (
                        <span className="text-gray-600">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleMode}
                                
                                className="text-[#95B8D4] hover:underline font-bold"
                            >
                                Login
                            </button>
                        </span>
                    )}
                </div>
            </div >
            <ToastContainer
          position="bottom-center"
          theme="dark"
          transition={Slide}
        />
        </div >
    );
};

