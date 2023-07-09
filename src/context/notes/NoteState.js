import React, { useState } from "react";
import NoteContext from "./noteContext"; //importing notecontext


const NoteState = (props) => {

    const host = 'http://127.0.0.1:5000';
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes)

    //Fetch all notes
    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTRiNzZlYjQxNzNjMDNjOGM2ZjJhIn0sImlhdCI6MTY4ODU2OTgxNH0.pbMfgxVmwAB1TLUc0slMyOz4I-wolnMtyCfH7wfaL84"
            },

            // body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json(); //parsing
        console.log(json);
        setNotes(json);
    }


    //Add Note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/createnote/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTRiNzZlYjQxNzNjMDNjOGM2ZjJhIn0sImlhdCI6MTY4ODU2OTgxNH0.pbMfgxVmwAB1TLUc0slMyOz4I-wolnMtyCfH7wfaL84"
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });

        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();

        //we are using concat because it return a new array
        setNotes(notes.concat(json));
    }


    //Delete Note
    const deleteNote = async (id) => {
        console.log("Deleting the id" + id)


        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTRiNzZlYjQxNzNjMDNjOGM2ZjJhIn0sImlhdCI6MTY4ODU2OTgxNH0.pbMfgxVmwAB1TLUc0slMyOz4I-wolnMtyCfH7wfaL84"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            // body: JSON.stringify({data}), // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json);

        //If note._id!==id only then it will stay in notes otherwise it won't
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }


    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNTRiNzZlYjQxNzNjMDNjOGM2ZjJhIn0sImlhdCI6MTY4ODU2OTgxNH0.pbMfgxVmwAB1TLUc0slMyOz4I-wolnMtyCfH7wfaL84"
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = response.json();
        console.log(json)

        //Logic to edit in client
        for (let index = 0; index < initialNotes.length; index++) {
            const element = initialNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }


    return (
        //Now whenever we will wrap something in between this context, automatically all children will be available in it. 
        //exporting addnote, delete, edit
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;