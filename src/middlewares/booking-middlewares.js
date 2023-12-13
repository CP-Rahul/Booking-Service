const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    ErrorResponse.message = 'Something went wrong while creating booking';
    if(!req.body.flightId) {
        ErrorResponse.error = new AppError([' flightId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.userId) {
        ErrorResponse.error = new AppError([' userId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.noOfSeats) {
        ErrorResponse.error = new AppError([' noOfSeats not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function validatePaymentRequest(req, res, next) {
    ErrorResponse.message = 'Something went wrong while making payment';
    if(!req.body.totalCost) {
        ErrorResponse.error = new AppError([' totalCost not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.userId) {
        ErrorResponse.error = new AppError([' userId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.bookingId) {
        ErrorResponse.error = new AppError([' bookingIdnot found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validatePaymentRequest
}