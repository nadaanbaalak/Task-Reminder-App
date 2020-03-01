const cron = require("node-cron");
const User = require("../models/User");
const Task = require("../models/Task");
const sgMail = require("@sendgrid/mail");
//const config = require('config')
require("dotenv").config();

sgMail.setApiKey(process.env.SG_API_KEY);

const checkOverdue = () =>
  cron.schedule("12 15 * * *", () => {
    User.find({}).then(users => {
      users.forEach(async function(user) {
        const tasks = await Task.find({ owner: user._id, completed: false });
        let overdueAmount = 0;
        let taskList = "";
        tasks.forEach(async task => {
          if (
            task.due_at &&
            task.due_at < new Date() &&
            task.toBeReminded === true &&
            task.completed === false
          ) {
            overdueAmount = overdueAmount + 1;
            taskList += overdueAmount + ". " + task.description + ".";
            task.completed = true;
          }
          await task.save();
        });
        if (overdueAmount > 0) {
          const msg = {
            to: user.email,
            from: "abhi.sharma2800015@gmail.com",
            subject: `${overdueAmount} Tasks Overdue | TaskApp`,
            text: `${user.name}, you have ${overdueAmount} tasks that are due for today. Make sure you get them done. ${taskList}`
          };
          sgMail.send(msg);
        }
      });
    });

    console.log("Ran cron for overdue tasks ");
  });

module.exports = checkOverdue;
