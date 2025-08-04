import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect(process.env.MONGO_URI, {dbName:"HOSPITAL"})
    .then(() => console.log("MongooDB is connected...!"))
    .catch((err) => console.log("error", err));
};
