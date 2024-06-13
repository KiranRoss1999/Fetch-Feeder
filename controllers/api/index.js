const router = require('express').Router();
const userRoutes = require('./user-routes');
const dogRoutes = require('./dog-routes');
const mealRoutes = require('./meal-routes');

router.use('/users', userRoutes);
router.use('/dogs', dogRoutes);
router.use('/meals', mealRoutes);

module.exports = router;