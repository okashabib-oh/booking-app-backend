import mongoose from "mongoose";
// const mongo_url = process.env.MONGO
const mongo_url = "mongodb+srv://okashahabibdev:JkrPw52HXdjtuCQY@bookings.q8q4l.mongodb.net/bookings?retryWrites=true&w=majority&appName=bookings"

mongoose.connect(mongo_url)
    .then(() => {
        console.log("Connected to MongoDB")
    }).catch((err) => {
        console.log("Error connecting to MongoDB ", err)
    })