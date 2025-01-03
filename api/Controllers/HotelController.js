import Hotel from "../Models/Hotel.js";
import Room from "../Models/Room.js";

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json({
            savedHotel,
            message: 'Hotel created successfully'
        });
    } catch (err) {
        next(err)
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({
            updatedHotel,
            message: 'Hotel updated successfully'
        });
    } catch (err) {
        next(err)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Hotel deleted successfully'
        });
    } catch (err) {
        next(err)
    }
}

const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json({
            hotel,
            message: 'Hotel found successfully'
        });
    } catch (err) {
        next(err)
    }
}

const getAllHotel = async (req, res, next) => {
    const { min, max, ...others } = req.query
    const limit = parseInt(req.query.limit)
    try {
        const hotels = await Hotel.find({
            ...others, cheapestPrice: {
                $gt: min | 1,
                $lt: max || 999
            }
        }).limit(limit);
        res.status(200).json({
            limit,
            hotels,
            message: 'Hotels found successfully'
        });
    } catch (err) {
        next(err)
    }
}

const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json({
            list,
            message: `Found ${list}`
        });
    } catch (err) {
        next(err)
    }
}

const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ]);

    } catch (error) {
        next(error)
    }
}

const getHotelRooms = async (req, res, next) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export { createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType, getHotelRooms }