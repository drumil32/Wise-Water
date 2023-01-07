const { decodeJWTtoken } = require('../utility/decodeJWTtoken');

const userTypeHandler = (req, res, next) => {
    console.log('here');
    const url = req.url.split('/');
    console.log(url)

    if ('user' === url[2]) {
        next();
        return;
    } else {
        console.log(url);
        if (('worker' === url[2] && 'application' === url[3]) || ('customer' === url[2] && 'register' === url[3]) || ('owner'===url[2] && 'register'===url[3]))  {
            console.log("in if.......")
            next();
            return; // otherwise after calling next it will run remaing code but we don't want that to do
        }
        const decoded = decodeJWTtoken(req,res);
        console.log('after called djt')
        console.log(decoded);
        if (decoded.collectionName.toLowerCase() === url[2].toLowerCase()) {
            console.log('next is called')
            next();
        }
        else {
            // console.log(error);
            res.status(401);
            throw new Error('not authorized');
        }
        console.log("from user type check middleware")
    }
}

module.exports = { userTypeHandler };