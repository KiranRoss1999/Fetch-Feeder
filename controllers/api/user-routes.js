const router = require('express').Router();
const { User } = require('../../models');
/* const { authenticateToken } = require('./jwt'); */
const jwt = require("jsonwebtoken");

// create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
        );
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// //login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { 
                email: req.body.email 
            }
        });
    
        if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        const accessToken = jwt.sign(

            {
              id: userData.id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '1h',
            }
    
          );

        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, accessToken, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
        console.error(err);
    }
});

// // Logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
