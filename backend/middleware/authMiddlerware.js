const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {mapCollectionName} = require('../utility/mappingCollection')

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req.body);
    console.log( 'from     protect')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            const collection = mapCollectionName( decoded.collectionName );
            // console.log(decoded);
            req.user = await collection.findById(decoded.id).select('-password'); // removing password from user object
            // console.log(req.user);
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('not authorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('not authorized, no token');
    }
});

module.exports = { protect };