const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const UserCtrl = require('../controllers/user');
const mongooseHelpers = require('../helpers/mongoose');

 //hitting dtabase to get data
router.get('/secret', UserCtrl.authMiddleware , function(req,res){
    res.json({"secret": true});

});

router.get('/:id', function(req, res){
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate('user', 'username-_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental){
        if(err){
            return res.status(422).send({title:'Rental error', detail: 'Could not find error'});
            // errors follo json API
        }
        return res.json(foundRental);
    });
});
router.get('', function(req, res){
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};

    Rental.find(query)
    .select('-bookings')
    .exec (function(err, foundRentals){
        if(err){
            return res.status(422).send(mongooseHelpers.normalizeErrors(err.errors));
        }
        if(city && foundRentals.length === 0){
            return res.status(422).send({title:'No rentals found', detail: `Could not find error in your city ${city}`});
        }
        return res.json(foundRentals);
        });
    });

router.post('', UserCtrl.authMiddleware, function(req,res){
    const {title, city, street, category, image, shared, bedrooms, description, dailyRate} = req.body;
    const user = res.locals.user;
    const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate});
    rental.user = user;

    Rental.create(rental, function(err, newRental){
        if(err){
            return res.status(422).send(mongooseHelpers.normalizeErrors(err.errors)); 
        }
        User.update({_id: user.id}, {$push: {rentals: newRental}}, function(){});
        return res.json(newRental);
    });
});


router.get('', function(req,res){
    Rental.find({}).select('-bookings').exec (function(err, foundRentals){
        res.json(foundRentals);
    });
});



module.exports = router;
