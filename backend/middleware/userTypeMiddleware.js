const {decodeJWTtoken} = require('../utility/decodeJWTtoken');

const userTypeHandler  = (req,res,next)=>{
    
    
    const url = req.url.split('/');

    if( 'worker' === url[2] && 'application' === url[3] ){
        console.log("in if.......")
        next();
    }
    const decoded = decodeJWTtoken(req);
    
    if( decoded.collectionName.toLowerCase() === url[2].toLowerCase() ){
        next();
    }
    else{
        // console.log(error);
        res.status(401);
        throw new Error('not authorized');
    }
    console.log("from usercheck")
}

module.exports = {userTypeHandler};