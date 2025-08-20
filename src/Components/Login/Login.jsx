import React, { useState } from "react";

const Login = ({ onLogin, onSignup }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        if (!isLogin) {
            if (!confirmPassword) {
                setError("Please confirm your password.");
                return;
            }
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            if (onSignup) {
                onSignup({ email, password });
            }
        } else {
            if (onLogin) {
                onLogin({ email, password });
            }
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                            required
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
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
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
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}
                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
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
                                className="text-blue-600 hover:underline font-medium"
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
                                className="text-blue-600 hover:underline font-medium"
                            >
                                Login
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Login };