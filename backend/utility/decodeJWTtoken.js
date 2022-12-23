const jwt = require('jsonwebtoken');
exports.decodeJWTtoken = (req)=>{
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // console.log(req)
        // get token from header
        token = req.headers.authorization.split(' ')[1];

        if( !token ){
            res.status(401);
            throw new Error('not authorized, no token');
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if(decoded === undefined){
            throw Error('No Header Found')
        }
        else{
        return decoded;
        }
    }
    else{
        res.status(401);
        throw new Error('not authorized, no token');
    }
}