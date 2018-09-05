'use strict';
var router = require('express').Router();
module.exports = router;

router.use(function (req, res, next) {
    console.log('HOST: ', req.headers.host);
    console.log('ORIGIN: ', req.headers.origin);
    next();
});

router.use('/members', require('./members'));
router.use('/neblioAPI', require('./neblioAPI'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
