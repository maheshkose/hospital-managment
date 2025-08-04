import { User } from "../Model/UserSchema.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";


export const isAdminAuthenticated = catchAsyncError(async (req,res,next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin is not authenticated",400))
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if (req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this role`,403))
    }
    next();
});

export const isPatientAuthenticated = catchAsyncError(async (req,res,next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("patient is not authenticated",400));
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if (req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} is not authorized for this role`,400));   
    }
    next();
});

