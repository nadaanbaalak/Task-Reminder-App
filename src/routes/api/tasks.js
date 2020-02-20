const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Task = require('../../models/Task');

//@route    POST api/tasks
//@desc     Create a task
//@access   Private
router.post('/', [auth,[
    check('description','Description is required').not().isEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).send({err:errors.array()});
    }
    
    try{
        const task = new Task({
            ...req.body,
            owner:req.user_id
        });
        await task.save();
        console.log('1->4')
        res.status(201).send(task);
        console.log('1->5')
    } catch(error)
    {
        res.status(500).send(error);
    }

});


//@route    PATCH api/tasks/:id
//@desc     update a task
//@access   Private
router.patch('/:id', [auth,[
    check('description','Description is required').not().isEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).send({err:errors.array()})
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'due_at','toBeReminded','completed'];
    const isValidOp = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
    if(!isValidOp)
    {
        return res.status(400).send();
    }
    //,owner:req.user_id
    try{
        const task = await Task.findById({_id:req.params.id});
        if(!task)
        {
            return res.status(404).send();
        }
        updates.forEach((update)=>{
            task[update] = req.body[update];
        });
        await task.save();
        res.send(task);
    } catch(error){
        res.status(500).send(error); 
    }

});

//@route    GET /api/tasks
//@desc     Get all task for a single User
//@access   Private
router.get('/',auth, async (req,res)=>{
    try {
        const tasks = await Task.find({owner:req.user_id});
        res.json(tasks);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET /api/tasks/:id
//@desc     Get a single task
//@access   Private
router.get('/:id',auth, async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id);
        if(!task)
        {
            return res.status(404).json({msg:'Task not found'});
        }
        res.json(task);
    } catch (error) {
        console.log(error.message);
        if(error.kind==='ObjectId')
        {
            return res.status(404).json({msg:'Task not found'});
        }
        res.status(500).send('Server Error');
    }
});

//@route    Delete /api/tasks/:id
//@desc     Delete a single task
//@access   Private
router.delete('/:id',auth, async (req,res)=>{
    try {
        //verifying whether the post belong to user performing the delete action
        
        const task = await Task.findById(req.params.id);
        if(task.owner.toString()!==req.user_id)
        {
            res.status(401).json({msg: 'Not Allowed'});
        }  
        if(!task)
        {
            return res.status(404).json({msg:'Task not found'});
        }        
        await task.delete();
        res.json(task);
    } catch (error) {
        console.log(error.message);
        if(error.kind==='ObjectId')
        {
            return res.status(404).json({msg:'Task not found'});
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router;