const router = require('express').Router();

const keyValuesRoute = require('../api/keyvalue/routes');

router.use('/key', keyValuesRoute);

module.exports = router;