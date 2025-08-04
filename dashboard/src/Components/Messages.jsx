import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";

const Messages = () => {
  const navigate = useNavigate();
  const [messages, setmessages] = useState([]);
   const { isAuthenticated, setisAuthenticated } = useContext(AppContext);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios
        .get("https://hospital-managment-backend-knzo.onrender.com/message/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          
          setmessages(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    navigate('/login');
  }
  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
        <div className="banner">
          {messages.length > 0 ?(
            messages.map((message,index)=>(
              <div key={index} className="card">
                <div className="details">
                  <p>First Name: <span>{message.firstName}</span></p>
                  <p>Last Name: <span>{message.lastName}</span></p>
                  <p>Email: <span>{message.email}</span></p>
                  <p>Phone: <span>{message.phone}</span></p>
                  <p>Message: <span>{message.message}</span></p>
                </div>
              </div>
            ))
          ):(<h1> No messages Exists...</h1>)}
        </div>
    
    </section>
  );
};

export default Messages;
