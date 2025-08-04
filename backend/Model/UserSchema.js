import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    enum: ["Male", "Female", "other"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "password must contain At least 8 characters"],
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDeparment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.generatejsonwebtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPRIES,
  });
};
export const User = mongoose.model("User", userSchema);
