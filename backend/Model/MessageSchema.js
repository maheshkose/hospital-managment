import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "message must contain atleast 10 characters"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
