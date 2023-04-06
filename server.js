import { app } from "./app.js";
import { connectToDB } from "./db/db_conn.js";
const port = process.env.PORT || 7000;

//db connection
connectToDB();

// start server
app.listen(port, () => {
    console.log("server started at port: " + port +" in " + process.env.NODE_ENV +" mode");
});
