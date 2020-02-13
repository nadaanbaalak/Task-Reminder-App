const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    due_at:{
        type:Date,
        default:null
    },
    completed:{
        type:Boolean,
        trim:true, 
        default:false
    },
    toBeReminded:{
        type:Boolean,
        default:null
    },
    owner:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'user'
    }
},{
    timestamps:true
})

const Task = mongoose.model('task',taskSchema);

module.exports = Task;