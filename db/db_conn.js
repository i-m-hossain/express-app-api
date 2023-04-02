import mongoose from "mongoose";

//connect to database
const connectToDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
        .then(() => console.log("connected to db"))
        .catch((error) => console.log(error));
};
export { connectToDB };
