const router = require('express').Router();
const { Dog, MealLog, WeightLog } = require('../../models');
const withAuth = require('../../utils/auth');
// const authenticateToken = require('./jwt');

// The `/api/dogs` endpoint

// CREATE a NEW dog

router.post('/', withAuth, async (req, res) => {

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
// router.get('/:id', withAuth, async (req, res) => {
//   try {
//     const dogData = await Dog.findByPk(req.params.id, {
//       where: { user_id: req.session.user_id},
//       include: [
//         {
//           model: MealLog,
//           attributes: [
//             'id',
//             'food',
//             'calories',
//             'date_created',
//           ],
//         },
//       ],
//     });

//     if (!dogData) {
//       res.status(404).json({ message: 'No dog found with this id!' });
//       return;
//     }

//     res.status(200).json(dogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// UPDATE dog information
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dog = await Dog.update(
      {
        name: req.body.name,
        weight: req.body.weight,
        calorie_target: req.body.calorie_target,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!dog[0]) {
      res.status(404).json({ message: 'No dog found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Dog updated successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

