import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../Controllers/UserController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../Utils/verifyToken.js';

const router = express.Router();

router.get('/authenticated', verifyToken, (req, res, next) => {
    res.send("Authenticated, Logged in!")
})

router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send(" Logged in! you can delete your account", res.username)
})

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send("Admin Logged in! you can delete all account",)
})

// update
router.put('/:id', verifyUser, updateUser)

// delete
router.delete('/:id', verifyUser, deleteUser)

// get
router.get(':/id', verifyUser, getUser)

// get all
router.get('/', verifyAdmin, getAllUser)

export default router;