const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/dev')
const mongooseHelpers = require('../helpers/mongoose');

exports.auth = function(req, res){

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({title:'Data missing', detail: 'Please enter email and password '});
    }

    User.findOne({email}, function(err, User){
        if(err){
            return res.status(422).send(mongooseHelpers.normalizeErrors(err.errors))
        }
        if(!User){
            return res.status(422).send({title:'Invalid Username', detail: 'User doesnt exists'});
        }
        if(User.hasSamePassword(password)){
            //return jwt 
            const token = jwt.sign({
                userId: User.id,
                username: User.username
            }, config.SECRET, {expiresIn: '1h'});
            return res.json(token);
        }
        else{
            return res.status(422).send({title:'Invalid Password', detail: 'Please enter correct password '});
        }
    });

}
exports.register = function(req, res){
    const username = req.body.username; // const {username} = req.body;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    if(!email || !password){
        return res.status(422).send({title:'Data missing', detail: 'Please enter email and password '});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({title:'Invalid password', detail: 'Password mismatch'});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send(mongooseHelpers.normalizeErrors(err.errors))
        }
        if(existingUser){
            return res.status(422).send({title:'Invalid email', detail: 'User alreaady exists'});
        }
    });

    const user = new User({
        username,
        email,
        password
    });

    user.save(function(err){
        if(err){
            return res.status(422).send(mongooseHelpers.normalizeErrors(err.errors));
        }
        return res.json({'registered': true});
    });

    // res.json({username, email}); //res.json({username: username, email: email}); {only if key value are same}

}
//npm i -g nodemon to watch changes in server code and will restart the code when changes appear

exports.authMiddleware = function(req,res,next){
    const token = req.headers.authorization;
    // token will be of the form Bearer lhfwlhf;wjwke'wk;wenv;w
    if(token){
        const user = parseToken(token);
        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send(mongooseHelpers.normalizeErrors(err.errors));
            }
            if(user){
                res.locals.user = user;
                next();
            }else{
                return res.status(401).send({title:'not authorized', detail: 'User not authorized'});
            }
        });
    }else{
        return res.status(401).send({title:'not authorized', detail: 'User not authorized'});
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET)
}

