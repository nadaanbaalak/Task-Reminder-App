# Task-Reminder-App
A MERN stack app to remind / notify user of Task due on that day on a daily Basis.
Uses Cron to send email daily at 8 in the morning to notify user of Due tasks for the day.

## Instruction's on how to use

Clone or Download the Repo

Create a .env file in the root directory and SPECIFY following Environment variables :
1. SG_API_KEY : Create an account on Sendgrid and generate an API key and substitute it here.
2. MONGO_URI: could be the address of either a cloud or a local mongoDB database
3. JWT_SECRET: specify anything you would like to use as your Jwt secret

Run __npm i__

Cd into client folder and again run __npm i__

Now run __npm run dev__

