const express = require('express');
const nodemailer = require('nodemailer');

const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Endpoint to send email using Brevo SMTP server
app.post('/send-email', async (req, res) => {
    const { to, firstName } = req.body;

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'jahnavig310@gmail.com', // your Brevo SMTP user
                pass: 'xsmtpsib-84363148d0b7cd9a6044f67f359aec927acdf006f586636173e11da432f33777-HUxXFrNy2GWPaqK9' // your Brevo SMTP password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'jahnavi2023.freelance@gmail.com',
            to: to,
            subject: 'Subscription confirmation',
            text: `Hello ${firstName}, Thanks for Subscribing ` // plain text body
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).send('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






// 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
