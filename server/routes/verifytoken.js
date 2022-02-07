const jwt = require('jsonwebtoken');

module.exports=function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({"message":'Access Denied'});

    try {
        const verified = jwt.verify(token,process.env.Token_secret);
        req.user= verified;
        //console.log('this is id '+req.user.email);
        next();

    } catch (error) {
        res.status(400).send({"message":'Invalid token'});
        
    }
}