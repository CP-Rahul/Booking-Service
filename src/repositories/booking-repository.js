const CrudRepository = require("./crud-repository");
const { Booking } = require('../models');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async createBooking(data, transaction) {
        const response = await Booking.create(data, {transaction: transaction});
        return response;
    }

    async get(data, transaction) {
        const response = await Booking.findByPk(data, {transaction: transaction});
        return response;
    }

    async update(data, id, transaction) {
        const response = Booking.update(data, {
            where: {
                id: id
            }
        },{transaction: transaction})
        return response;
    }
}

module.exports = BookingRepository;