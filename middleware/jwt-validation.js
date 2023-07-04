const jwt = require('jsonwebtoken');
module.exports = function (request, response, next) {
    const bearerHeader = request.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        if (bearer.length < 2) {
            return response.sendStatus(403)
        }
        const token = bearer[1];
        request.token = token;
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            err ? response.sendStatus(403) : next();
        });
    } else {
        response.sendStatus(403);
    }
}