const express = require('express');
const {check,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User')

require('dotenv').config()

//@route GET api/auth
//@desc  get user by token
//access Private

router.get('/',auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user_id).select('-password');
        res.json(user);
    } catch(error)
    {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route  POST /api/auth
//@desc   Authenticate user and get token
//@access Public
router.post('/',[
    check('email','Email is Required').isEmail(),
    check('password', 'Password is required').exists()
], async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).send({errors:error.array()})
    }
    const {email,password} = req.body;
    try{
        //see if the user exists
        let user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error:[{msg:'Invalid Credentials'}]})
        }
        const isMatch = await bcrypt.compare(password,user.password); 
        if(!isMatch)
        {
            return res.status(400).json({error:[{msg:'Invalid Credentials'}]})
        }
        //Return JWT so that user is logged in after registering
        jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:360000},(error,token)=>{
            if(error)
                throw error;
            return res.send({token});
        })

    } catch(error)
    {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;