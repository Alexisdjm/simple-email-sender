const { response, request } = require('express');
const { getRequiredFields, getConfiguredAllowedFields, parseLabels } = require('../helpers/fields');

const test = (req = request, res = response) => {
    let enviromentSetted = {
        EMAIL_SENDER: process.env.EMAIL_SENDER ? true : false,
        EMAIL_RECEIVER: process.env.EMAIL_RECEIVER ? true : false,
        SMTP_USER: process.env.SMTP_USER ? true : false,
        PASSWORD: process.env.PASSWORD ? true : false,
        ALLOWED_FIELDS: getConfiguredAllowedFields(),
        REQUIRED_FIELDS: getRequiredFields(),
        FIELD_LABELS: parseLabels(process.env.FIELD_LABELS),
        MAIL_SUBJECT: process.env.MAIL_SUBJECT || 'Te han contactado desde tu página web',
    };
    res.json({
        msg: 'API Loaded',
        enviromentSetted
    });
}

module.exports = {
    test,
}