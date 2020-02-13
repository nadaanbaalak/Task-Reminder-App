const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    location:{
        type:String
    },
    age:{
        type:Number, 
        default:0
    },
    bio:{
        type:String
    },
    social:{
        twitter:{
            type:String
        },
        facebook:{
            type:String
        },
        instagram:{
            type: String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Profile = mongoose.model('profile',ProfileSchema);
module.exports = Profile;