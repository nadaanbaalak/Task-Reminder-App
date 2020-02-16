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
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Task = mongoose.model('task',taskSchema);

module.exports = Task;