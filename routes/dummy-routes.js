const { Router } = require('express');

const { test } = require('../controllers/dummy-controller');

const router = Router();

router.get('/test', test);

module.exports = router;