const router = require('express').Router();
const { Dog, MealLog } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/dogs` endpoint

// CREATE a NEW dog
router.post('/', withAuth, async (req, res) => {
  try {
    const newDog = await Dog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newDog);
  } catch (err) {
    res.status(400).json(err);
  }
});


// GET all dogs for the logged in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dogData = await Dog.findAll({
      where: {
        user_id: req.session.user_id },
    });
    res.status(200).json(dogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one dog by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const dogData = await Dog.findByPk(req.params.id, {
      include: [
        {
          model: MealLog,
          attributes: [
            'id',
            'food',
            'calories',
            'date_created',
          ],
        },
      ],
    });

    if (!dogData) {
      res.status(404).json({ message: 'No dog found with this id!' });
      return;
    }

    res.status(200).json(dogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
