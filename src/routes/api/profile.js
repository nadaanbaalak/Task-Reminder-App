const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Task = require('../../models/Task');
const {sendGoodbyeMail} = require('../../emails/account');

//@route    GET api/profile/me
//@desc     Get current User's Profile
//@access   Private
router.get('/me', auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user: req.user_id}).populate('user', ['name','avatar']);

        if(!profile)
        {
            return res.status(400).json({msg:'There is no profile for this user'})
        }
        res.json(profile)
    } catch(error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST api/profile
//@desc     Create or Update user Profile
//@access   Private
router.post('/', auth, async (req,res)=>{
    const {bio,age,location,facebook,twitter,instagram} = req.body;
    //build profile object
    let profileFields = {};
    profileFields.user = req.user_id;
    if(bio)
    {
        profileFields.bio = bio;
    }
    if(location)
    {
        profileFields.location = location;
    }
    if(age)
    {
        profileFields.age = age;
    }
    //Build Social object
    profileFields.social = {};
    if(facebook)
    {
        profileFields.social.facebook = facebook;
    }
    if(twitter)
    {
        profileFields.social.twitter = twitter;
    }
    if(instagram)
    {
        profileFields.social.instagram = instagram;
    }
    try{
        let profile = await Profile.findOne({user:req.user_id});
        console.log('After finding the profile')
        if(profile)
        {
            //update
            profile = await Profile.findOneAndUpdate(
                {user:req.user_id}, 
                profileFields,
                {new:true}
            );
            return res.json(profile)
        }
        //create  
        profile = new Profile(profileFields); 
        await profile.save();
        console.log('profile saved');
        res.json(profile)
    } catch(error)
    {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

}) 

//@route    GET api/profile
//@desc     get all the profiles
//@access   Public

router.get('/',async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch(error)
    {
        console.log(error.message)
        res.status(500).send('Server Error');
    }
})

//@route    GET api/profile/user/:user_id
//@desc     get the profile of a user
//@access   Public

router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile)
        {
            return res.status(400).json({msg:'Profile not found'});
        }
        res.json(profile);
    } catch(error){
        console.log(error.message)
        if(error.kind=='ObjectId')
        {
            return res.status(400).json({msg:'Profile not found'});
        }
        res.status(500).send('Server Error');
    }
})

//@route    Delete api/profile
//@desc     delete all the profile,user and task
//@access   Private

router.delete('/', auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user_id);
        //removing user profile
        await Profile.deleteOne({user:req.user_id});
        //Removing the User
        await User.deleteOne({_id:req.user_id});
        //removing related tasks
        await Task.deleteMany({owner:req.user_id});
        sendGoodbyeMail(user.email,user.name);
        res.json({msg:'User deleted'});
    } catch(error)
    {
        console.log(error.message)
        res.status(500).send('Server Error');
    }
})
module.exports = router;