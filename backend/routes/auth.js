const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/Users_m');
const Note = require('../models/Notes_m');
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
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
    body('lastname', 'Enter your last name').notEmpty(),
    body('age', 'Enter valid age').notEmpty()
], async (req, res) => {

    let success = false;

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
            return res.status(400).json({ success: success, message: 'Sorry, a user with same email address already exists' });
        }

        //securing password using hashimg and salt
        const salt = await bcrypt.genSalt(10);
        let securePass = await bcrypt.hash(req.body.password, salt)

        //we dont need .then if we are using await
        //create a user
        user = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
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
        success = true
        res.json({ success: success, message: ' Account created ', authToken });

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

    let success = false;
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
        success = true
        res.json({ success: success, message: 'Login success', authToken });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


//Route 3: Get loggedin user details : Login required
//where ever we need logged usr details we will add fetchuser like this
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password'); //w are not fetching password
        const countNotes = await Note.countDocuments({ user: userId });
        // console.log(user, countNotes)
        res.json({ user, countNotes });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


//Route3: update users using: PUT "/api/user/updateuser".Login required
//In API header we are sending JWT auth token 
router.put('/updateuser/:id', fetchuser, async (req, res) => {

    const { name, lastname, age, password, newPassword } = req.body;
    let success = false;

    //securing password using hashimg and salt
    const salt = await bcrypt.genSalt(10);
    let securePass = await bcrypt.hash(newPassword, salt)

    try {

        //create a updateUser object
        const updateUser = {};
        if (name) { updateUser.name = name };
        if (lastname) { updateUser.lastname = lastname };
        if (age) { updateUser.age = age };
        


        //Find the user to be updated and update it
        // using let instead of const, coz we are updating the variable
        let user = await User.findById(req.params.id);

        //comparing user entered password in database
        if (password){ 
            updateUser.password = securePass;
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success: success, message: 'Entered password is wrong' });
            }
        };
        

        if (!user) { return res.status(404).send("Not Found") }

        //Allow updation if user own this user
        if (user._id.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //new:true -> if some new content comes then create it
        user = await User.findByIdAndUpdate(req.params.id, { $set: updateUser }, { new: true })
        success = true;
        res.json({ success: success, message: 'User updated!!!', user: user });
        // res.json({ user });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


})



//Route4: Delete user using: Delete "/api/note/deletenote".Login required
router.delete('/deleteUser/:id', fetchuser, async (req, res) => {

    let success = false;

    try {
        //Find the note to be delete and delete it
        // using let instead of const, coz it was throwing error
        let user_d = await User.findById(req.params.id);
        let notes = await Note.find({ user: req.user.id });
        notes = (JSON.parse(JSON.stringify(notes)))


        if (!user_d) { return res.status(404).send("Not Found") }

        // dont Allow deletion if user dont own this note
        if (user_d._id.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed to delete user");
        }

        notes.forEach(note => {
            console.log(note.user);
            if (note.user !== req.user.id) {
                return res.status(401).send("Not Allowed to delete notes ");
            }

        });

        user_d = await User.findByIdAndDelete(req.params.id)

        for (const note of notes) {
            console.log(note.user);
            await Note.deleteMany({ user: note.user });
        }

        // if(notes){
        //     console.log("deleted notes")
        // }
        success = true;
        res.json({ success: success, message: 'Your account has been permanatly deactivated and all your notes are deleted ', user_d: user_d, notes: notes });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


})


module.exports = router //so that we can import it in index.js