const router = require('express').Router();
const { MealLog } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/meals` endpoint

// CREATE a NEW meal
router.post('/', withAuth, async (req, res) => {
  try {
    const newMeal = await MealLog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newMeal);
  } catch (err) {
    res.status(400).json(err);
  }
});


// GET all meals logs for a specific dog
router.get('/:dog_id', withAuth, async (req, res) => {
  try {
    const mealData = await MealLog.findAll(
        {
            where: {
                dog_id: req.params.dog_id
            },
        }
    );
    res.status(200).json(mealData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;