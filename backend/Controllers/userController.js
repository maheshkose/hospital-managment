import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../Model/UserSchema.js";
import { genrateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password 
    
  ) {
    return next(new ErrorHandler("fill full form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("pateint already exists", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role:"Patient"
  });

  res.status(200).json({
    success: true,
    message: "Pateint registerd succefully",
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password  || !role) {
    return next(new ErrorHandler("fill full form we!", 400));
  }

  
  //find email
  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  // compare password
  const isvalid = await user.comparePassword(password);
  if (!isvalid) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  //check role
  if (role !== user.role) {
    return next(new ErrorHandler(`User with this role not found`, 400));
  }
  genrateToken(user, `${role} logged In successfully`, 200, res);
});

export const addAdmin = async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("fill all fields", 400));
  }

  const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(
      new ErrorHandler(`${isRegister.role} with this email already exists`)
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New User Registerd",
  });
};

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json({
      success:true,
      message:"Admin logOut Successful"
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json({
      success:true,
      message:"patient logOut Successful"
    });
});

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  //docAvatar image
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("DocAvatar Required",400));
  }

  const docAvatar = req.files?.docAvatar;
  const allowedFormats = ['image/png','image/jpeg','image/webp'];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("file format not supported",400));
  }


//Genaral details
    const { firstName, lastName, email, phone, nic, dob, gender, password,doctorDeparment } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDeparment
  ) {
    return next(new ErrorHandler("fill all fields", 400));
  }

    const isRegister = await User.findOne({ email });
  if (isRegister) {
    return next(
      new ErrorHandler(`${isRegister.role} with this email already exists`)
    );
  }

  
   const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "cloudinary Error",cloudinaryResponse.error || "unknwon cloudinary error"
    );
  }

  
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDeparment,
    role: "Doctor",
    docAvatar:{
      public_id:cloudinaryResponse.public_id,
      url:cloudinaryResponse.secure_url
    }
  });
  
  res.status(200).json({
  success: true,
  message: "New Doctor Registerd",
});
})
