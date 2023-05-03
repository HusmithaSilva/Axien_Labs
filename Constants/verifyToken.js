const jwt = require('jsonwebtoken');
const {TOKEN_SEC} = require('./tokenKey');

module. exports =  function(req, res, next){
    const token = req.header('Authentication');
    if(!token){
        return res.send({
            success: false,
            message: "access denied"
        })
    }


    try{

        const verified = jwt.verify(token, TOKEN_SEC);    
        req.loggedUser = verified;
        // req.body = verified;
        next();
       

    }catch(err){
        console.log(err)
        res.send({
            success: false,
            message: "Invalid Token"
        });
    }
}
