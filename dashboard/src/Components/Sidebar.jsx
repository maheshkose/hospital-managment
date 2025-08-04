import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [show, setshow] = useState(false);
  const { isAuthenticated, setisAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const goto = (path) => {
    navigate(path);
    setshow(!show);
  };

  const handleLogout = async () => {
    await axios
      .get("response?.data?https://hospital-managment-backend-knzo.onrender.com/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("response",res);
        toast.success(res.data.message);
        setisAuthenticated(false);
      })
      .catch((err) => {
        //  console.log("error",err);
        toast.error(err.response?.data?.message);
      });
  };
  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={() => goto("/")} />
          <FaUserDoctor onClick={() => goto("/doctors")} />
          <MdAddModerator onClick={() => goto("/admin/addnew")} />
          <IoPersonAddSharp onClick={() => goto("/doctor/addnew")} />
          <AiFillMessage onClick={() => goto("/messages")} />
          <RiLogoutBoxFill onClick={() => handleLogout()} />
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
