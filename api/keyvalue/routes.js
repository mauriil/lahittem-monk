const router = require('express').Router();
const controller = require('./controller');

router.get('/:key', async(req, res) => {controller.getKeyValue(req, res)});

module.exports = router;