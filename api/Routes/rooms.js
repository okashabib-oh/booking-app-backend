import express from 'express'
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from '../Controllers/RoomController.js';
import { verifyAdmin } from '../Utils/verifyToken.js';

const router = express.Router();

// Create
router.post('/:hotelid', verifyAdmin, createRoom)

// Update
router.put('/:id', verifyAdmin, updateRoom)

// Availability
router.put('/availability/:id', updateRoomAvailability)

// Delete room
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)

// Get single room
router.get('/:id', verifyAdmin, getRoom)

// get all rooms
router.get('/', getAllRoom)


export default router;