const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/Users_m');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//hardcoding token
const JWT_SECRET = 'JWTPriv@teKEY';

//Route 1: create a user using: POST "/api/auth/". Dosent require authentication
router.post('/createuser', [
    body('name', 'Enter valid name and atleast 5 character').notEmpty().isLength({ min: 3 }).escape(),  //escape is a sanitizer, means no one can send data through url manually
    body('email', 'Enter valid email').isEmail(), //these are vaidators
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {

    //Check if there are any error in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // try to run below code if something goes wrong it will throw error
    try {

        //check if user with same email alrady exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: 'Sorry, a user with same email address already exists' });
        }

        //securing password using hashimg and salt
        const salt = await bcrypt.genSalt(10);
        securePass = await bcrypt.hash(req.body.password, salt)

        //we dont need .then if we are using await
        //create a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        })

        //we will use user id as a unique value so that we can verify JWT
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

//Route 2: Authenticat user : no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(), //these are vaidators
    body('password', 'Enter your password').exists()
], async (req, res) => {

    //Check if there are any error in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //destructuring --> fetching email & pass from req.bosy
    const { email, password } = req.body;

    try {

        //find user with the email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: 'Please try to login with correct credentials' });
        }

        //comparing user entered password in database
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: 'Please try to login with correct credentials' });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


//Route 3: Get loggedin user details : Login required
//where ever we need logged usr details we will add fetchuser like this
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); //w are not fetching password
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


module.exports = router //so that we can import it in index.js