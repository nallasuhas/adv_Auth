import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./db/connectdb.js";
import authRoute from "./routes/authroute.js"

dotenv.config()


const app = express();
app.use(express.json())

app.use('/api/auth', authRoute)
app.listen(3000,() => {
    connectDB()
    console.log("server started");
})