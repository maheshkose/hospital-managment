import express from "express";
import {
  addAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../Controllers/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

//patient register
router.post("/patient/register", patientRegister);
//login
router.post("/login", login);
//new admin register
router.post("/admin/addnew", isAdminAuthenticated, addAdmin);
//get all doctors
router.get("/doctors", getAllDoctors);
//get user details
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
//admin log out
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
//patient logout
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
//add new doctor
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
export default router;
