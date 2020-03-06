const express = require("express");
const router = express.Router();
const Eth = require("../models/ethModel");
const nodemailer = require("nodemailer");
var fs = require("fs");
// const verify = require('./verifyToken')
var d;
fs.readFile("result2.html", "UTF-8", function(err, data) {
  d = data;
});

// GETS BACK ALL THE COURSE
router.get("/", async (req, res) => {
  try {
    const eth = await Eth.distinct("email");
    res.json(eth);
    console.log(eth);

    for (let i = 0; i < eth.length; i++) {
        
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "tajammulkh@gmail.com",
          pass: "tk11khan"
        }
      });

        

      let mailOptions = {
        from: "tajammulkh@gmail.com",
        to: eth[i],
        subject: "Yeah!",
        text:"https://www.meta-chart.com/share/results-310" 
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error.message);
        }
        console.log("success");
      });
    }
    
    //Error handling
  } catch (err) {
    res.json({ message: err });
  }
});

//POST THE COURSE
router.post("/", async (req, res) => {
  // console.log(req.body)
  const eth = new Eth({
    email: req.body.email,
    ethAddress: req.body.ethAddress
  });
  try {
    const saved = await eth.save();
    res.json(savedEth);
  } catch (err) {
    res.json({ message: err });
  }
});

//GETSPECIFIC COURSSE
// router.get('/:courseId', async (req, res) => {
//     try {
//         // console.log(req.params.courseId )
//         const course = await Course.findById(req.params.courseId)
//         res.json(course)
//     } catch (err) {
//         res.json({ message: err })
//     }
// })

// //DELETE COURSE
// router.delete('/:courseId', async (req, res) => {
//     try {
//         const removedCourse = await Course.deleteOne({ _id: req.params.courseId })
//         res.json(removedCourse)
//     } catch (err) {
//         res.json({ message: err })
//     }
// })

module.exports = router;
