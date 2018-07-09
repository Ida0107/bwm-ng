const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: {type: String, required: true, max:[128, 'Too long, max is 128 characters']},
    city: {type: String, required : true, lowercase: true},
    street: {type: String, required : true, min: [4, 'min is 4 characters']},
    category: {type: String, required : true, lowercase: true},
    image: {type: String, required : true},
    bedrooms: Number,
    shared: Boolean,
    description :{type: String, required: true},
    dailyRate: Number,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Rental', rentalSchema); //Rental is name of model. By convention it starts with capital letter

