import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AppContext from "../../Context/AppContext";
const AddNewDoctor = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setisAuthenticated } = useContext(AppContext);
  const [docAvatarPreview, setDocAvatarPreview] = useState(null);

  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
    {
      name: "Other",
    },
  ];
  const [formData, setformData] = useState({
    firstName: "mahesh",
    lastName: "kose",
    email: "ms@gmail",
    phone: "1234567890",
    nic: "1234567890",
    dob: "",
    gender: "",
    password: "1234567890",
    doctorDeparment: "",
    docAvatar: null,
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
    "doctorDeparment",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "docAvatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setDocAvatarPreview(reader.result);
        setformData({ ...formData, docAvatar: file });
      };
    } else {
      setformData({ ...formData, [name]: value });
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      payload.append(key, val);
    });
    console.log(payload);

    try {
      const response = await axios.post(
        "https://hospital-managment-backend-knzo.onrender.com/user/doctor/addnew",
        payload,
        { withCredentials: true }
      );

      toast.success(response?.data?.message);
      // setisAuthenticated(true);
      // navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // if (!isAuthenticated) {
  //   navigate('/login');
  // }
  return (
    <>
      <div className="container form-component add-admin-form">
        <img src="/image/logo.png" alt="logo" />
        <h1>Add New Doctor</h1>
        <div style={{width:"400px", borderRadius:"8px"}}>
          <img src={docAvatarPreview ? docAvatarPreview : "/image/docHolder.jpg"} alt=""  style={{width:"400px", borderRadius:"8px"}}/>
        </div>
        <form onSubmit={handlesubmit}>
          <input type="file" name="docAvatar" onChange={handleChange} />
          {fields.map((field, index) => (
            <div key={index}>
              {field === "gender" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : field === "doctorDeparment" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Doctor's Deparment
                  </option>
                  {departmentsArray.map((depart, index) => (
                    <option key={index} value={depart.name}>
                      {depart.name}
                    </option>
                  ))}
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
                      : field === "docAvatar"
                      ? "file"
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
            <button type="submit">Add New Doctor</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewDoctor;
