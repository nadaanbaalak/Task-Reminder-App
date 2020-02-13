const mongoose = require('mongoose');
const config = require('config');
const db_uri = config.get('mongoURI');

const connectDB = async ()=>{
    try{
        await mongoose.connect(db_uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('Connected to Database!!')
    } catch(error)
    {
        console.log(error);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;