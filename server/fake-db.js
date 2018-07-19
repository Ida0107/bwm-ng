const Rental = require('./models/rental');
const User = require('./models/user');
const fakeDbData = require('./data.json');
const Booking = require('./models/booking')

class FakeDb {
    constructor(){
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;
    }
    async cleanDb(){
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDataToDb(){
        
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental); //this relationship means that our rentals belong to th user. testuser is the owner
            newRental.save();
        })
        user.save();
        user2.save();
    }

    async seedDb(){
        await this.cleanDb();
        this.pushDataToDb();

    }
}
module.exports = FakeDb;