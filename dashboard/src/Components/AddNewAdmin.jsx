import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AppContext from "../../Context/AppContext";
const AddNewAdmin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setisAuthenticated } = useContext(AppContext);
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

  const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "nic",
    "dob",
    "gender",
    "password",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "gender") {
      setformData({ ...formData, [name]: value });
    } else {
      setformData({ ...formData,[ name]: value });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hospital-managment-backend-knzo.onrender.com/user/admin/addnew",formData,{withCredentials: true, headers: { "Content-Type": "application/json" }
});

      toast.success(response.data.message);
      setisAuthenticated(true);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message);

      
    }
  }

  if (!isAuthenticated) {
    navigate('/login');
  }
  return (
    <>
      <div className="container form-component add-admin-form">
        
        <img src="/image/logo.png" alt="logo" />
        <h1>Add New Admin</h1>
        <form onSubmit={handlesubmit}>
          {fields.map((field, index) => (
            <div key={index}>
              {field === "gender" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : field === "dob"
                      ? "date"
                      : field === "password"
                      ? "password"
                      : "text"
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  name={field}
                  required
                  placeholder={`Enter your ${field}`}
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
            <span>Already Have Account</span>
            <Link to={"/login"}>Login</Link>
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <button type="submit">Add Admin</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewAdmin;
