const { Router } = require('express');

const { check } = require('express-validator');

const {
    validateFields,
} = require('../middlewares');

const { contactPost } = require('../controllers/contact');
const { getRequiredFields } = require('../helpers/fields');

const router = Router();

const requiredFieldChecks = getRequiredFields().map((field) =>
    check(field, `${field} is required`).notEmpty()
);

router.post('/',
[
    ...requiredFieldChecks,
    validateFields
],
contactPost);

module.exports = router;