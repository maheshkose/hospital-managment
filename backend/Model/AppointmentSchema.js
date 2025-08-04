import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain atleast 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "last name must contain atleast 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "please provide valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "phone must contain exact 10 characters"],
    maxLength: [10, "phone must contain exact 10 characters"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [10, "nic must contain exact 10 characters"],
    maxLength: [10, "nic must contain exact 10 characters"],
  },
  dob: {
    type: Date,
    required: [true, "dob is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited:{
    type:Boolean,
    default:false
  },
    doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true
  },
   patientId:{
    type:mongoose.Schema.ObjectId,
    required:true
  },
   address:{
    type:String,
    required:true
  },
   status:{
    type:String,
    required:true,
    enum:["Pending","Accepted","Rejected"],
    default:"Pending"
  }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
