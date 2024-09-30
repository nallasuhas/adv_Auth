import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./db/connectdb.js";
import authRoute from "./routes/authroute.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()


const app = express();
app.use(cors({ origin: "http://localhost", credentials: true }));
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.listen(3000,() => {
    connectDB()
    console.log("server started");
})