const express = require('express');
const {check,validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const router = express.Router();
const User = require('../../models/User')
const {sendWelcomeMail} = require('../../emails/account');


require('dotenv').config()



//@route  POST /api/users
//@desc   Register a user
//@access Public
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email','Email is Required').isEmail(),
    check('password', 'Password needs to be of atleast 6 characters').isLength({min:6})
], async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).send({errors:error.array()})
    }
    const {name,email,password} = req.body;
    try{
        //see if the user exists
        let user = await User.findOne({email})
        if(user)
        {
            return res.status(400).json({error:[{msg:'User already exists'}]})
        }
        //Get user's Gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        user = new User({
            name,
            email,
            password,
            avatar
        })
        //Encrypt Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        //Return JWT so that user is logged in after registering
        jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:360000},(error,token)=>{
            if(error)
                throw error;
            sendWelcomeMail(user.email,user.name);
            return res.json({token})
        })

    } catch(error)
    {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;