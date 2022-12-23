const jwt = require('jsonwebtoken');
exports.generateJWTtoken = (id,collectionName) =>{
    console.log(id + " "+ collectionName)
    return jwt.sign({id,collectionName},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
}