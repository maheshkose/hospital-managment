import e from "express";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointment } from "../Controllers/appointmentController.js";

const appointmentRouter = e.Router();

//fronend
appointmentRouter.post('/post', isPatientAuthenticated, postAppointment);

//dashboard
appointmentRouter.get('/getallappointment', isAdminAuthenticated, getAllAppointment);
appointmentRouter.put('/update/:id', isAdminAuthenticated, updateAppointment);
appointmentRouter.delete('/delete/:id', isAdminAuthenticated, deleteAppointment);

export default appointmentRouter;