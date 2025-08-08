import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import cors from 'cors';
import { db } from "./Database/dbconnection.js";
import messageRouter from "./Routes/messageRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./Routes/userRouter.js";
import appointmentRouter from "./Routes/appointmentRouter.js";

const app = express();

//.env config
config({ path: "./config/config.env" });

//cors config

app.use(
  cors({
    origin: [process.env.FRONTEND_URI, process.env.DASHBOARD_URI],
    method: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  })
  // [process.env.FRONTEND_URI, process.env.DASHBOARD_URI]
);
// app.options('/*', cors());


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/temp/'
    })
);

//database connection
db();


//routers
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmentRouter);

//errorMiddleware
app.use(errorMiddleware);
export default app;