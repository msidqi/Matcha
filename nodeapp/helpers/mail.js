
const sendMail = (to, subject, text) => {
    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
    });
    let mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports = sendMail;