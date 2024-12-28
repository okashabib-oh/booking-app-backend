import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 8008
import cors from 'cors'
import authRoute from './Routes/auth.js';
import hotelRoute from './Routes/hotels.js';
import roomRoute from './Routes/rooms.js';
import userRoute from './Routes/users.js';
import cookieParser from 'cookie-parser';
import './Models/db.js';

app.get("/test", (req, res) => {
    res.send("Hello, there!");
})
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`);
})