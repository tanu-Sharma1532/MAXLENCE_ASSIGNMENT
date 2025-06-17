const nodemailer = require('nodemailer');
require('dotenv').config();

const MailSender = async (to, subject, message, senderName = 'Test Mail') => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: 'apikey',
                pass: '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'
            }
        });

        const mailOptions = {
            from: `${senderName} <testmails@stocksbizz.com>`, 
            to,
            subject,
            html: message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        return info;
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
};

module.exports = MailSender;
