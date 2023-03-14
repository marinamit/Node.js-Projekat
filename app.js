require('dotenv').config();
const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const port = process.env.PORT || 8000

const BadRequestError = require('./errors/BadRequestError');
const errorHandler = require('./middleware/errorHandler');
const NotFound = require('./middleware/NotFound');

app.use(express.static('public'));
app.use(express.json());


function sendEmail(from, to, subject, message){
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user:'nekimejl@gmail.com',
                pass: process.env.PASSWORD
            }
        })
        const mail_configs ={
            from:from,
            to:to,
            subject:subject,
            text:message
        }
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error)
                return reject({message:`An error has occured`})
        }
                return resolve({message:`Email sent succesfuly`})
    })
    })
}

app.post('/api/v1/sendmail',(req,res) => {
    const from = req.body.from;
    const to = req.body.to;
    const subject = req.body.subject;
    const message = req.body.message;
    if(!from){
        throw new BadRequestError('from is required');
    }
    if(!to){
        throw new BadRequestError('to is required');
    }
    if(!subject){
        throw new BadRequestError('subject is required');
    }
    if(!message){
        throw new BadRequestError('message is required');
    }
    sendEmail(from,to,subject,message)
    .then(response => res.send(response.message))
    .catch(error => res.status(500).send(error.message))

})

app.use(NotFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`)
})