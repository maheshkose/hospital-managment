import React, { useContext, useEffect, useState } from "react";
import { context } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { url } from "../Components/url.js"; // Import the URL from the url.js file
const Login = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(context);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
 
 

  const navigate = useNavigate();
  useEffect(() => {
  
  }, [isAuthenticated])
  
  // const login = async () => {
  //   try {
  //     const apiRes = await axios.post(
  //       `${url}/user/patient/login`,
  //       { email, password, confirmPassword, role:"Patient" },
  //       { withCredentials: true, headers: { "Content-Type": "application/json" } }
  //     );
  //     console.log("apires", apiRes);
  //     return apiRes;
  //   } catch (error) {
  //     return error;
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await login();
  //     console.log("result", result);
  //     toast.success(result.response?.data?.message)
  //   } catch (error) {
  //     console.log("error", error);
  //     toast.error(error.response?.data?.message);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/user/patient/login`,
        { email, password, role:"Patient" },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      )
        toast.success(response?.data?.message);
        setisAuthenticated(true);
        navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Sign in to continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
          maiores est consequatur quisquam similique quae.
        </p>
        <form onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          
         

          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p>Not Registerd</p>
            <Link to={"/register"}>Register Now</Link>
          </div>
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
