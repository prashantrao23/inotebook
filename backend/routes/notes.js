const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Note = require('../models/Notes_m');
const fetchuser = require('../middleware/fetchuser');

//Route1: Get all the notes using: GET "/api/note/fetchnallnotes".Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    //fetching notes by user id. We are getting user id through fetchuser
    const note = await Note.find({ user: req.user.id });
    res.json(note);


})

//Route2: Add new notes using: POST "/api/note/createnote".Login required
router.post('/createnote', fetchuser, [
    body('title', 'Title cannot be empty').notEmpty().isLength({ min: 3 }).escape(),
    body('description', 'Description cannot be empty').notEmpty().isLength({ min: 5 }).escape()
], async (req, res) => {

    //destructuring: fetching these details from req.body
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote);

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }



})

//Route3: update notes using: PUT "/api/note/updatenote".Login required
//In API header we are sending JWT auth token 
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    try {
        //create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it
        // using let instead of const, coz it was throwing error
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow updation if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //new:true -> if some new content comes then create it
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


})


//Route4: Delete notes using: Delete "/api/note/deletenote".Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //Find the note to be delete and delete it
        // using let instead of const, coz it was throwing error
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow updation if user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //new:true -> if some new content comes then create it
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has ben deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


})

module.exports = router