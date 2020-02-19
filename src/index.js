const express = require('express');
const connectDB = require('../config/db');
const taskRouter = require('./routes/api/tasks');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const checkOverdue = require('./Cron-job/cron');
const app = express();


//to parse the incoming Request Data
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter);
app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);

app.get('/',(req,res)=>{
    res.send('API up and Running');
})
//connecting to Database
connectDB();

const port = process.env.PORT || 5000;
checkOverdue();

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); })