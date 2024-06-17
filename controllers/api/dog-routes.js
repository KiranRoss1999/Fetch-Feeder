const router = require('express').Router();
const { Dog, MealLog, WeightLog } = require('../../models');
const withAuth = require('../../utils/auth');
const authenticateToken = require('./jwt');

// The `/api/dogs` endpoint

// CREATE a NEW dog

router.post('/', withAuth, authenticateToken, async (req, res) => {

  // Log the request body to debug the incoming data
  console.log('Request Body:', req.body);

  const { name, weight, calorie_target } = req.body;

  // Validate the request data
  if (!name || !weight || !calorie_target) {
    return res.status(400).json({ message: 'Please provide name, weight, and calorie target for the dog.' });
  }

  try {
    const newDog = await Dog.create({
      name,
      weight,
      calorie_target,
      user_id: req.session.user_id,
    });
    res.status(200).json(newDog);
  } catch (err) {
    console.error("Error creating a new dog: ", err);
    res.status(400).json(err);
  }
});


// GET all dogs for the logged in user
router.get('/', withAuth, authenticateToken, async (req, res) => {
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
router.get('/:id', withAuth, authenticateToken, async (req, res) => {
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

// UPDATE a dog's weight and calorie_target
router.put('/:id',  async (req, res) => {
  try {
    const dog = await Dog.findByPk(req.params.id);
    if (!dog) {
      res.status(404).json({ message: 'No dog found with this id!' });
      return;
    }
    const { weight, calorie_target } = req.body;
    const updates = {};
    if (weight !== undefined && weight !== dog.weight) {
      updates.weight = weight;
      await WeightLog.create({
        weight: weight,
        dog_id: dog.id
    })
  }
    if (calorie_target !== undefined) {
      updates.calorie_target = calorie_target;
    }
    await dog.update(updates);
    res.status(200).json(dog);
  } catch (err) {
    res.status(400).json(err);
  }
}
);

module.exports = router;

