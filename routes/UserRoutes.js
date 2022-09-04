const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtValidation = require('../middleware/jwt-validation');

router.post('/register', async (request, response) => {
    try {
        const user = new User(request.body);
        const result = await user.save();
        if (!result) {
            response.status(400);
            response.send('Bad Request');
            return;
        }
        response.status(201);
        response.json(result);
    } catch(ex) {
        response.status(500);
        response.send('Error. Please try again.');
    }
});

router.post('/login', async (request, response) => {
    try {
        if (!isUserValid(request.body.email, request.body.password)) {
            response.status(400);
            response.send('Bad Request');
            return;
        }
        const user = await User.findOne({ 
            email: request.body.email, 
            password: request.body.password
        });
        
        if (!user) {
            response.status(404);
            response.send('Wrong email or password, please try again.');
            return;
        }
        const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY)
        response.status(200);
        response.json({ token });
    } catch (ex) {
        console.log(ex.message);
        response.status(500);
        response.send('Error. Please try again.');
    }
});

router.get('/secret', jwtValidation, (req, res) => {
    res.send('SECRET DATA DROR');
});

function isUserValid(email, password) {
    return ![email, password].some(e => !['string', 'number'].includes(typeof e) || !e);
}

module.exports = router;