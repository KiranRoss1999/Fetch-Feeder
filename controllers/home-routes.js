const router = require("express").Router();
const { Dog, MealLog, User, WeightLog } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

//render new-dog page form
router.get('/new-dog', withAuth, (req, res) => {
  res.render('new-dog', {
    logged_in: req.session.logged_in,
  });
});

// get all dogs for the logged in user
router.get("/dashboard", withAuth, async (req, res) => {
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

    res.render("dashboard", {
      dogs,
      meals,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one dog by id with meal logs
router.get("/dog/:id", withAuth, async (req, res) => {
  try {
    const dogData = await Dog.findByPk(req.params.id, {
      include: [
        {
          model: MealLog,
          attributes: [
            "id",
            "food",
            "calorie",
            // 'date_created',
          ],
        },
      ],
    });

    if (!dogData) {
      res.status(404).json({ message: "No dog found with this id!" });
      return;
    }

    const dog = dogData.get({ plain: true });

    res.render("dog", {
      dog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a dogs weight
router.get("/dog/:id/weight", withAuth, async (req, res) => {
  try {
    const dogData = await Dog.findByPk(req.params.id, {
      include: [
        {
          model: WeightLog,
          attributes: [
            'id',
            'weight',
            'created_at',
          ],
        },
      ],
    });

    if (!dogData) {
      res.status(404).json({ message: "No dog found with this id!" });
      return;
    }

    const dog = dogData.get({ plain: true });

    res.render("weight", {
      dog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
