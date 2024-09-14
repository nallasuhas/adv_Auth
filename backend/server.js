import express from "express";
import dotenv  from "dotenv";
import { connectDB } from "./db/connectdb.js";

dotenv.config()


const app = express();

app.get('/', (req, res) => {
    res.send("hello")
})
app.listen(3000,() => {
    connectDB()
    console.log("server started");
})