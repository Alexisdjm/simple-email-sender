const { response, request } = require('express');
const nodemailer = require('nodemailer');

const contactPost = (req = request, res = response) => {

    let emailSender = process.env.EMAIL_SENDER;
    let emailReceiver = process.env.EMAIL_RECEIVER ?? process.env.EMAIL_SENDER;
    let title = process.env.TITLE ?? "Te han contactado desde tu página web";
    console.log('message', process.env.PASSWORD);

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // port: 587,
        auth: {
        //   user: process.env.EMAIL ,
          user: emailSender ,
          pass: process.env.PASSWORD,
        },
      });

    transporter.verify().then(console.log).catch(console.error);

    const mailOptions = {
        from: emailSender,
        to: emailReceiver,
        subject: title,
        text: req.body.message,
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });
    // const transporter = nodemailer.createTransport({
    //     service: "Gmail",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //       user: "your_email@gmail.com",
    //       pass: "your_app_password",
    //     },
    //   });

    res.json({
        msg: 'post API - contactPost '
    });
}

module.exports = {
    contactPost,
}