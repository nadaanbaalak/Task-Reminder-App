const sgMail = require('@sendgrid/mail');
//const config = require('config');
require('dotenv').config()

sgMail.setApiKey(process.env.SG_API_KEY);

const sendWelcomeMail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'abhi.sharma2800015@gmail.com',
        subject:'Thanks for Joining In!',
        text:`Hi, ${name}, welcome to the App. Now never forget Anything. Don't forget to complete your user profile!!`
    })
}

const sendGoodbyeMail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'abhi.sharma2800015@gmail.com',
        subject:'Sorry to see you go',
        text:`Goodbye, ${name}. Hope to see you back soon sometime in near future.`
    })
}
module.exports = {
    sendWelcomeMail,
    sendGoodbyeMail
}