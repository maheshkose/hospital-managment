import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Message } from "../Model/MessageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("fill all fileds", 400));
  }

  await Message.create({ firstName, lastName, email, phone, message });

  res.status(201).json({ message: "message saved in database", success: true });
});

export const getAllMessage = catchAsyncError(async (req,res,next) => {
  
  const message = await Message.find();

  res.status(200).json({
    success:true,
    message
  });
})