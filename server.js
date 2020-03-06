const express = require('express')
const app = express();
const http = require('http')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const courseRoutes = require('./routes/course')
const ethRoutes = require('./routes/ether')
// const exphbs = require('express-handlebars');
// const path = require('path');
// const nodemailer = require('nodemailer');

dotenv.config();

mongoose.connect('mongodb+srv://aj:ajmani@cluster0-c60su.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));


// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('From server')
})

app.use('/ether', ethRoutes)

app.use('/user', userRoutes)

app.use('/course', courseRoutes)



// let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//         user: 'tajammulkh@gmail.com',
//         pass: 'tk11khan'
//     }
//   });

//   let mailOptions = {
//         from: 'tajammulkh@gmail.com',
//         to: req.body.email,
//         subject: 'Yeah!',
//         text: 'please work'
//     };
  
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error.message);
//       }
//       console.log('success');
//   });


http.createServer(app).listen(process.env.PORT || 3000);
console.log("BackEnd Server Is On=", process.env.PORT || 3000);