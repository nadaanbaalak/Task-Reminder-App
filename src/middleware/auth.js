const jwt = require('jsonwebtoken');
//const config = require('config');
require('dotenv').config()

module.exports = (req,res,next)=>{
    //Get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token)
    {
        return res.status(401).json({msg:'No token, authorization denied'});
    }
    //verify token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user_id = decoded.id;
        next();  
    } catch(error)
    {
        res.status(401).json({msg:'Invalid Token'});
    }
};