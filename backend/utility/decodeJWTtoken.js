const jwt = require('jsonwebtoken');
exports.decodeJWTtoken = (req, res) => {

    const { authorization } = req.headers
    console.log(authorization)
    if ('Bearer undefined'!==authorization) {
        const token = authorization.split(' ')[1];
        if ('undefined' !== token) {
            console.log('from dcode jwt token');
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded === undefined) {
                throw new Error('invalid token')
            }
            else {
                console.log('data');
                console.log(decoded)
                return decoded;
            }
        } else {
            res.status(401);
            throw new Error('not authorized, no token');
        }
    } else {
        res.status(401);
        throw new Error('not authorized, no token');
    }
}