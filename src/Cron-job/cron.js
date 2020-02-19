const cron = require('node-cron')
const User = require('../models/User');
const Task = require('../models/Task');
const sgMail = require('@sendgrid/mail');
const config = require('config')

sgMail.setApiKey(config.get('sgAPIKey'));

const checkOverdue = () => cron.schedule('29 21 * * *', () => {
  User.find({}).then((users) => {
    users.forEach(async function(user) {
      const tasks = await Task.find({ owner: user._id })
      let overdueAmount = 0
  
      tasks.forEach((task) => {
        if (task.due_at && (task.due_at < new Date() && task.toBeReminded===true)) {
          overdueAmount = overdueAmount + 1
        }
      })
  
      if (overdueAmount > 0) {
        const msg = {
          to: user.email,
          from: 'abhi.sharma2800015@gmail.com',
          subject: `${overdueAmount} Overdue Tasks`,
          text: `${user.name}, you have ${overdueAmount} over tasks! Make sure you get them done.`
        }
        sgMail.send(msg)
      }
    })
  })
    
  console.log('Ran cron for overdue tasks ');
});

module.exports = checkOverdue

