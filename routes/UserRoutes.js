const router = require('express').Router();
const jwt = require('jsonwebtoken');
const jwtValidation = require('../middleware/jwt-validation');
const sql = require('mssql');
const { query } = require('../database/sql');

router.post('/register', async (request, response) => {
    try {
        // TODO: things and stuff...
        response.status(201);
        response.json(result);
    } catch(ex) {
        response.status(500);
        response.send('Error. Please try again.');
    }
});

router.post('/login', async (request, response) => {
    try {
        // TODO: Stuff and things

        // get jwt token with userId
        // const token = await jwt.sign({id: userId}, process.env.SECRET_KEY)
        
        response.status(200);
        response.json({ token });
    } catch (ex) {
        response.status(500);
        response.send('Error. Please try again.');
    }
});

router.get('/secret', jwtValidation, (req, res) => {
    res.send('This route is protected by JWT');
});


module.exports = router;
