import User from "../Models/User.js"
import bcrypt from 'bcrypt'
import { createError } from "../Utils/error.js"
import jwt from 'jsonwebtoken'

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const newUser = new User({
            ...req.body,
            password: password
        })
        newUser.password = await bcrypt.hash(newUser.password, 10)
        await newUser.save();
        res.status(200).json({
            newUser: newUser,
            message: "User registered successfully"
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne(
            { username: username }
        )
        if (!user) {
            return next(createError(404, "User not found"))
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return next(createError(400, "Invalid credentials"))
        }
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET
        )
        const { isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({
            details: { ...otherDetails }, isAdmin,
            message: "Logged in successfully",
        })
    } catch (error) {
        next(error)
    }
}

export { register, login }