const { response, request } = require('express');

const test = (req = request, res = response) => {
    let enviromentSetted = {
        EMAIL_SENDER: process.env.EMAIL_SENDER ? true : false,
        EMAIL_RECEIVER: process.env.EMAIL_RECEIVER ? true : false,
        SMTP_USER: process.env.SMTP_USER ? true : false,
        PASSWORD: process.env.PASSWORD ? true : false,
    };
    res.json({
        msg: 'API Loaded',
        enviromentSetted
    });
}

module.exports = {
    test,
}