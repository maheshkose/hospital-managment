import { clearScreenDown } from "readline";
import cloudinary from "cloudinary";
import app from "./app.js";

const port = process.env.PORT;

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
app.listen(port,()=>console.log(`server is running on port ${port}`));