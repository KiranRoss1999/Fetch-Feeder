const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dogRoutes = require('./api/dog-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api/dog', dogRoutes);

module.exports = router;