const jwt = require('jsonwebtoken');

exports.generateJWTtoken = (_id, collectionName) => {
    return jwt.sign({ _id, collectionName }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}