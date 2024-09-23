
const express = require("express");
require('dotenv').config();

const cors = require("cors");
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
let dbconnection = require("./auth");

const nodemailer = require("nodemailer");


const Booking = require('./models/ContactModel')

app.get("/", (req, res) => {
  res.send("Hello World!");
});




function EmailTemplate(name){
    const HTMLTemplate = `<!DOCTYPE html>
    <html>
    
    <head>
        <title>Message Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                line-height: 1.6;
            }
    
         
    
            #background-2 {
                background: #FAF9F6;
                padding: 20px;
                width: 80%;
                margin: -30px auto 50px;
                border-radius: 15px;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
                text-align: center;
            }
    
            h1 {
                font-size: 1.8em;
                color: #333;
            }
    
            p {
                font-size: 1em;
                color: #555;
                margin: 15px 0;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #080808;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
                transition: background-color 0.3s ease;
            }
    
            .button:hover {
                background-color: #909090	;
            }
    
            @media screen and (max-width: 800px) {
                #background-3 {
                    width: 90%;
                    height: 120px;
                    font-size: 1em;
                }
    
                #background-2 {
                    width: 90%;
                }
            }
    
            @media screen and (max-width: 500px) {
                #background-3 {
                    width: 95%;
                    height: 100px;
                    font-size: 0.9em;
                }
    
                #background-2 {
                    width: 95%;
                }
    
                .button {
                    font-size: 0.9em;
                }
            }
        </style>
    </head>
    <body>
      
        <div id="background-2">
            <h1>Message Received!</h1>
            <p>Hi ${name}, Thank you for reaching out. Your message has been successfully delivered, and I'll get back to you as soon as possible.</p>
            <p>If you have any urgent questions, feel free to reply to this email.</p>
            <a href="mailto:awanishsampleprojects@gmail.com" class="button" style="text-decoration:none;color:white;" >Contact Me</a>
            <p>Best Regards,</p>
            <p>Awanish Mishra</p>
        </div>
    </body>
    
    
    </html>`;

    return HTMLTemplate;
}

app.post("/api/contact", async(req, res) => {
   
   
    const {name, message, email} = req.body;
    const booking = new Booking({
        name,
        message,
        email
    });
    
    const isBooked = await booking.save();
    if(isBooked){
        const HTMLTemplate = EmailTemplate(name);
        const msg = {
            from: process.env.FROM_EMAIL,
            to: `${email}`,
            subject: `Message Received`,
            html: HTMLTemplate,
          };
          nodemailer
            .createTransport({
              service: "gmail",
              auth: {
                user:  process.env.FROM_EMAIL,
                pass: process.env.FROM_EMAIL_PASSWORD,
              },
              port: 465,
              host: `smtp.gmail.com`,
            })
            .sendMail(msg, (err) => {
              if (err) {
                console.log("Error is", err);
              } else {
                console.log("Email sent to", email);
              }
            });

        return res.status(200).json({message:"Contact form data saved successfully"});
    }
    else{
        res.status(400).json({message:"Failed to save contact form data"});
    }


 
  });

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`);
});

