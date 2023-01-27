const asyncHandler = require('express-async-handler');
const { decodeJWTtoken } = require('../utility/decodeJWTtoken');
const { mapCollectionName } = require('../utility/mappingCollection');

const protect = asyncHandler(async (req, res, next) => {
    console.log('from auth!!')
    const { _id, collectionName } = decodeJWTtoken(req, res);
    const collection = mapCollectionName(collectionName);
    console.log('from auth middle ware');
    try {
        req.userid = await collection.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        res.status(401).json({
            error:{
                errorMessage:['you are not authorized for this page']
            }
        });
    }
});

module.exports = { protect };