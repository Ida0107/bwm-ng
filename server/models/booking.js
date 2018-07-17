const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startAt: {type: Date, required:'Starting date is required'},
    endAt: {type: Date, required:'End date is required'},
    totalPrice: {type: Number},
    days: {type: Number},
    createdAt : {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref : 'User'},
    rental: {type: Schema.Types.ObjectId, ref : 'Rental'}

});

module.exports = mongoose.model('Booking', bookingSchema); //Booking is name of model. By convention it starts with capital letter

