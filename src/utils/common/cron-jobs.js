const cron = require('node-cron');

const { BookingService } = require('../../services')

 function Cron() {
    cron.schedule('*/10 * * * * *', async() => {
      await BookingService.cancellOldBooking();
      });
}

module.exports = Cron;