import mongoose from "mongoose";

//connect to database
const connectToDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
        .then((db) => console.log("Database connected with "+db.connection.host))
        .catch((error) => console.log(error));
};
export { connectToDB };
