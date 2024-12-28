import User from "../Models/User.js";
import bcrypt from 'bcrypt'

const updateUser = async (req, res, next) => {
    try {
        const { password } = req.body;
        if (password) {
            req.body.password = await bcrypt.hash(password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            updatedUser,
            message: 'User updated successfully'
        });
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Hotel deleted successfully'
        });
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            user,
            message: 'User found successfully'
        });
    } catch (err) {
        next(err)
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            users,
            message: 'Users found successfully'
        });
    } catch (err) {
        next(err)
    }
}

export { updateUser, deleteUser, getUser, getAllUser }