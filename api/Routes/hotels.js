import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotel, getHotel, getHotelRooms, updateHotel } from '../Controllers/HotelController.js';
import { verifyAdmin } from '../Utils/verifyToken.js';

const router = express.Router();

// Create
router.post('/', verifyAdmin, createHotel)

// Update
router.put('/:id', verifyAdmin, updateHotel)
// 253 58% 15% #1a103c

// Delete
router.delete('/:id', verifyAdmin, deleteHotel)

// Get single hotel
router.get('/find/:id', getHotel)

// Get all hotels
router.get('/', getAllHotel)

router.get('/countByCity', countByCity)

router.get('/countByType', countByType)

router.get('/room/:id', getHotelRooms)

export default router;