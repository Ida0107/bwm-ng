// node server setup
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals')

mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() =>{
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});
// connect method returns a promise

const app = express();
const PORT = process.env.PORT || 3001; //to check if PORT 3001 is available

app.use('/api/v1/rentals', rentalRoutes);    //use is to make use of middlewares

// app.get('/rentals', function(req, res){
//     res.json({'sucess': true});
// });


// app.listen is used to make it listen to the request on PORT
app.listen(PORT, function(){
    console.log("running");
});
