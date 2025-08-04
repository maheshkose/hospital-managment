import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setisAuthenticated } = useContext(AppContext);
  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginFormData({ ...loginFormData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "response?.data?https://hospital-managment-backend-knzo.onrender.com/api/v1/user/login",
        loginFormData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response?.data?.message);
      setisAuthenticated(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (isAuthenticated) {
    navigate('/');
  }
  return (
    <>
      <div className="container form-component login-form">
       <img src="/image/logo.png" alt="" />
        <p style={{textTransform:"capitalize"}}>
          Only Admins are allowed To Access This resources
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={loginFormData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={loginFormData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your confirmPassword"
            required
          />

          
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
