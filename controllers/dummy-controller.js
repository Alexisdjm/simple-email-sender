const { response, request } = require('express');

const test = (req = request, res = response) => {
    let enviromentSetted = {
        EMAIL_SENDER: process.env.EMAIL_SENDER ? true : false,
        EMAIL_RECEIVER: process.env.EMAIL_RECEIVER ? true : false,
        PASSWORD: process.env.PASSWORD ? true : false,
        TITLE: process.env.TITLE ? true : false,
    };
    res.json({
        msg: 'API Loaded',
        enviromentSetted
    });
}

module.exports = {
    test,
}