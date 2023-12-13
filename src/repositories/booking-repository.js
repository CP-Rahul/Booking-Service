const { Op } = require('sequelize');

const CrudRepository = require("./crud-repository");
const { Booking } = require('../models');
const { Enums } = require('../utils/common');
const  { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

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
        const response = await Booking.update(data, {
            where: {
                id: id
            },
            transaction: transaction
        },)
        return response;
    }

    async cancellOldBooking(timestamp) {
        try {
            const response = Booking.update({status: CANCELLED}, {
                where: {
                    [Op.and]: [
                        {
                            createdAt: { [Op.lt]: timestamp},
                        },
                        {
                            status: { [Op.ne]: BOOKED},
                        },
                        {
                            status: { [Op.ne]: CANCELLED},
                        }
                      ],
                }
            })
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookingRepository;