import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Messageform = () => {
  const url = "https://hospital-managment-backend-knzo.onrender.com";
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await axios.post(`${url}/message/send`, {
        firstName,
        lastName,
        email,
        phone,
        message,
      },
   { 
    withCredentials:true,
    headers:{
     "Content-Type":"application/json"
    }}
    );
    console.log(apiRes);
    
    toast.success(apiRes.data.message);
    setfirstName("");
    setemail("");
    setlastName("");
    setphone("");
    setmessage("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <>
      <div className="container form-component message-form">
        <h2>send us a message</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Enter your phone number"
            name="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            required
          />
          <textarea
            rows={7}
            placeholder="Enter your message"
            name="message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            required
          ></textarea>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Messageform;
