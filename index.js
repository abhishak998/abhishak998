const express =require('express');
const app= express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
//port
const port= process.env.PORT || 1001;

// connection to db and Schema
const {connectdb} =require('./connection.js');
const contactSchema =require('./models/index.js')
// connection to db
connectdb();

// middelwear
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));





app.get('/', (req, res) => {
    // Send the 'home.html' file as the response
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abhishakk998@gmail.com',
        pass: 'cyhtsjsfzwwnkomj'
    }
});

// Function to send email
const sendEmail = async (name,to, subject, text) => {
    try {
   // Read the HTML file content
   let html = fs.readFileSync('mail.html', 'utf8');

   // Replace the client name placeholder with the actual client name
   html = html.replace('{{clientName}}', name);


        // Send email to client
        await transporter.sendMail({
            from: 'abhishakk998@gmail.com',
            to: to,
            subject: 'Thankyou',
            html: html 
        });

        // Send email to admin
        await transporter.sendMail({
            from: 'abhishakk998@gmail.com',
            to: 'abhishakk998@gmail.com',
            subject: `New contact form submission: ${subject}`,
            text: `A new message has been received from ${name}:\n\n${to}:\n\n${text}`
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};




app.post("/save", async (req, res) => {
     // Extract data from request body
     const { name, email, subject, message } = req.body;

     // Check if request body is empty
     if (!name || !email || !subject || !message) {
         return res.status(400).json({ error: "All fields are required" });
     }
 
     try {
         // Create a new document with the extracted data
        // const newContact = await contactSchema.create({ name, email, subject, message });

         // Usage example
        const clientname = name;
        const clientEmail = email;
        const clientsubject = subject;
        const text = message;

        // Send email to client and admin
        sendEmail(clientname,clientEmail, clientsubject, text);         
         // Send a success response
         return res.status(201).json({ msg: "Data inserted successfully" });
        } catch (error) {
         // Handle errors
         console.error(error);
         return res.status(500).json({ error: "Internal Server Error" });
        }
});

app.listen(port,()=>{console.log(`Server start on ${port}`);})