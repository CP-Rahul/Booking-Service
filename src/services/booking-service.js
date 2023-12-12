const { default: axios } = require('axios');
const { StatusCodes } = require('http-status-codes');

const { BookingRepository } = require('../repositories');
const db = require('../models');
const { ServerConfig } = require('../config');
const AppError = require('../utils/errors/app-error');

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const flight = await axios.get(`${ServerConfig.FLIGHTS_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if(flightData.totalSeats < data.noOfSeats) {
            throw new AppError('This much of seats are not available', StatusCodes.BAD_REQUEST);
        }
        const billingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data, totalCost: billingAmount};
        const booking = await bookingRepository.createBooking(bookingPayload, transaction);
        await axios.patch(`${ServerConfig.FLIGHTS_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats: data.noOfSeats
        });
        await transaction.commit();
        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    createBooking
}