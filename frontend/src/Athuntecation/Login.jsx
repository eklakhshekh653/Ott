import React, { useState, useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    document.title = 'Ecommerce | LogIn';
    return () => { document.title = 'Ecommerce App'; };
  }, []);

  const setHandlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const authHeader = `Basic ${btoa(`${form.username}:${form.password}`)}`;
      const response = await axios.get("http://localhost:8080/ott/signIn", {
        headers: { Authorization: authHeader },
      });
    
      console.log("Login Response:", response.data); 
    
      if (response.headers.authorization) {
        localStorage.setItem("jwtToken", response.headers.authorization);
        localStorage.setItem("name", response.data.firstNAme );
        localStorage.setItem("userid", response.data.id);
        alert("Login successfully");
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert(error.response?.status === 401 ? "Invalid credentials. Please try again." : "Error during login. Please try again later.");
    }
    
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center px-4" >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-700">Welcome to User Login</h2>
        <form onSubmit={submitHandler} className="mt-4">
          <div className="mb-8">
            <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={setHandlerChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={setHandlerChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
