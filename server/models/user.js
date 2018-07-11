const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max:[32, 'Too long, max is 32 characters']
    },
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max:[32, 'Too long, max is 32 characters'],
        unique: true,
        required: 'Email is required',
        lowercase: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max:[32, 'Too long, max is 32 characters'],
        required : 'Password is required'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]

});
// userSchema.pre('save', function(next){
//     const user = this;
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             user.password = hash;
//             next();
//             // Store hash in your password DB.
//         });
//     });
// });
userSchema.methods.hasSamePassword= function(requestedPassword){
    return (requestedPassword === this.password)
}
module.exports = mongoose.model('User', userSchema); //User is name of model. By convention it starts with capital letter

