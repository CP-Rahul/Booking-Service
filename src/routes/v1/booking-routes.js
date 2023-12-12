const express = require('express');

const { BookingController} = require('../../controllers');
const { BookingMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/',
        BookingMiddlewares.validateCreateRequest,
        BookingController.createBooking);

router.post('/payments',
        BookingController.makePayment);

module.exports = router;