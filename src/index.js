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


//to parse the incoming Request Data
app.use(express.json({extended:false}));
app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter);
app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);

//Serve static assets in production


const port = process.env.PORT || 5000;
checkOverdue();




app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
});
