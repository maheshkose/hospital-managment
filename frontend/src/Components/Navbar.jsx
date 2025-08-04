import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(context);


  useEffect(() => {
   
  }, [isAuthenticated])
  
  const handleLogout = async () => {
    try {
      
      const apiRes = await axios.get("https://hospital-managment-backend-knzo.onrender.com/user/patient/logout",{withCredentials:true});
      console.log(apiRes);
      
      toast.success(apiRes.data.message);
      setisAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
  const gotoLogin = async () => {
    navigate('/login');
  }
  return (
    <>
      <nav className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src="/image/logo.png" alt="logo.png" className="logo-img"/>
          </Link>
          </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {/* <Link to={"/"}>Home</Link> */}
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={"/about"}>About Us</Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="logoutBtn btn" onClick={gotoLogin}>
              Login
            </button>
          )}

        </div>
          <div className="hamburger" onClick={()=>setshow(!show)}>
            <GiHamburgerMenu/>
          </div>
      </nav>
    </>
  );
};

export default Navbar;
