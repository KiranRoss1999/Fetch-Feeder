const router = require("express").Router();
const { MealLog, Dog, User } = require("../../models");
const withAuth = require("../../utils/auth");

// The `/api/meals` endpoint
//meal logs with user

router.get("/", withAuth, async (req, res) => {
  try {
    const dogData = await Dog.findAll({
      where: { user_id: req.session.user_id },
    });

    const dogs = dogData.map((dog) => dog.get({ plain: true }));

    const mealData = await MealLog.findAll({
      include: [
        {
          model: Dog,
          where: { user_id: req.session.user_id },
        },
      ],
    });

    const meals = mealData.map((meal) => meal.get({ plain: true }));

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("logMeal", {
      dogs,
      meals,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a NEW meal
router.post("/", withAuth, async (req, res) => {
  try {
    const newMeal = await MealLog.create({
      food,
      calories,
      user_id: req.session.user_id,
    });
    res.status(200).json(newMeal);
  } catch (err) {
    res.status(400).json(err);
  }
});


// GET all meals logs for a specific dog
router.get("/:dog_id", withAuth, async (req, res) => {
  try {
    const mealData = await MealLog.findAll({
      where: {
        dog_id: req.params.dog_id,
      },
    });
    res.status(200).json(mealData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
