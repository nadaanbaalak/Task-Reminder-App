const express = require('express');
const connectDB = require('../config/db');
const taskRouter = require('./routes/api/tasks');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const checkOverdue = require('./Cron-job/cron');
const path = require('path');


const app = express();

//connecting to Database
connectDB();



//Set static folder
app.use('/',express.static(path.join(__dirname,'../client/build')));
    


//to parse the incoming Request Data
app.use(express.json({extended:false}));
app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter);
app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);

//Serve static assets in production

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '../client/build','index.html'))
});


const port = process.env.PORT || 5000;
checkOverdue();

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
//process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); })
//"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"