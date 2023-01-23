const asyncHandler = require('express-async-handler');
const { decodeJWTtoken } = require('../utility/decodeJWTtoken');
const { mapCollectionName } = require('../utility/mappingCollection');

const protect = asyncHandler(async (req, res, next) => {
    console.log("from auth middleware")
    const { _id, collectionName } = decodeJWTtoken(req, res);
    const collection = mapCollectionName(collectionName);
    console.log(collection)
    console.log(_id)
    try {
        req.userid = await collection.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('not authorized');
    }
});

module.exports = { protect };