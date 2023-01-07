exports.profile = (req,res) =>{
    console.log(req.user);
    console.log('from customer profile')
    res.json({
        user : req.user
    });
}