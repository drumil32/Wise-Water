const errorHandler = (err, req, res, next) => {
    // console.log(res);
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
    res.status(statusCode);
    console.log('here!!!!')
    res.json({
        type : 'error', // to check on frontend type of response
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
    });

}

module.exports = { errorHandler };