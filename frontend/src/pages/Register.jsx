import React, { useContext, useState } from "react";
import { context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate('/');
  }

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
  });

  const [message, setmessage] = useState("");
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
     e.preventDefault();
    //optional code
    setmessage('');
    seterror('');

     const {
      firstName, lastName, email, phone,
      nic, dob, gender, password
    } = formData;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
      seterror('Please fill out the entire form.');
      return;
    }

    //optional//
    try {
      const response = await axios.post(
        "response?.data?https://hospital-managment-backend-knzo.onrender.com/api/v1/user/patient/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response?.data?.message);
      setmessage(response?.data?.message)
      setformData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
      });
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "registration failed");
      seterror(error.response?.data?.message)
    }
  };
  return (
    <>
      <div className="container register-form form-component ms-register-form">
        <h2 style={{textAlign:"center"}}>Sign Up</h2>
        <form onSubmit={handleRegister}>
          {[
            "firstName",
            "lastName",
            "email",
            "phone",
            "nic",
            "dob",
            "gender",
            "password",
          ].map((field) => (
            <div key={field}>
              {/* <label htmlFor="">{field.charAt(0).toUpperCase()+ field.slice(1)}</label> */}
              {field === "gender" ?(
                <select name={field} value={formData[field]} onChange={handleChange} placeholder="Enter your gender" required>
                  
                  <option value="" disabled>select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">female</option>
                  <option value="Other">Other</option>
                </select>
              ):(

                <input
                  type={
                    field === "dob" 
                      ? "date"
                      : field === "password"
                      ? "password"
                      : "text"
                  }
                  placeholder={`Enter your ${field}`}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p>Already Have Account</p>
            <Link to={"/login"}>Login</Link>
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <button type="submit">Register</button>
          </div>
        </form>

        <div>

        </div>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default Register;
