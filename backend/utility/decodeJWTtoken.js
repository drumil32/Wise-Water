const jwt = require('jsonwebtoken');
exports.decodeJWTtoken = (req,res) => {
    if (req.body.token ) {
        // console.log(req)
        // get token from header
        

        if (!req.body.token) {
            res.status(401);
            throw new Error('not authorized, no token');
        }

        // verify token
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
        console.log(decoded);
        if (decoded === undefined) {
            throw Error('No Header Found')
        }
        else {
            return decoded;
        }
    }
    else {
        res.status(401);
        throw new Error('not authorized, no token');
    }
}