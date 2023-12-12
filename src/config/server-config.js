const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    FLIGHTS_SERVICE: process.env.FLIGHTS_SERVICE
}