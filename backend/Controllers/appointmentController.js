import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../Model/AppointmentSchema.js";
import { User } from "../Model/UserSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor ||
    hasVisited === undefined ||
    !address
  ) {
    return next(new ErrorHandler("fill all fields", 404));
  }

  const isDoctor = await User.findById(doctor);
  const doctorFirstName = isDoctor.firstName;
  const doctorLastName = isDoctor.lastName;


  let isConflict = await User.find({
    firstName: doctorFirstName,
    lastName: doctorLastName,
    doctorDeparment: department,
    role: "Doctor",
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor Not found "), 404);
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor Conflict! Please contact through email or phone "
      ),
      404
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctorFirstName,
      lastName: doctorLastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    message: "Appointment added successfully",
  });
});

export const getAllAppointment = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find();

  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("appointment not found"));
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Appointment status updated",
    appointment,
  });
});

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("appointment not found"));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment deleted",
  });
});
