import React, { useState } from "react";
import NoteContext from "./noteContext"; //importing notecontext


const NoteState = (props) => {

    const host = 'http://127.0.0.1:5000';
    const initialNotes = [];
    const authToken = localStorage.getItem('token');

    const [notes, setNotes] = useState(initialNotes)

    const initialUser = [];
    const [userdetail, setUserdetail] = useState(initialUser)

    //Fetch User
    const fetchUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },

            // body: JSON.stringify({}), // body data type must match "Content-Type" header
        });
        const json = await response.json(); //parsing
        console.log(json);
        // setUserdetail([json])
        setUserdetail(JSON.parse(JSON.stringify(json)));
    }

    // Update user
    const editUser = async (id, name, password, newPassword) => {
        //API call
        const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },

            body: JSON.stringify({ name, password, newPassword }), // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json)

        let updatedUser = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < updatedUser.length; index++) {
            const element = updatedUser[index];
            if (element._id === id) {
                updatedUser[index].name = name;
                updatedUser[index].password = newPassword;
                
                break;
            }
        }

        if (json.success) {
            props.showalert(`${json.message}`, 'success');
            console.log(json.message)
        } else {
            if (json.message === undefined) {
                props.showalert(`Oops unable to update your details`, 'danger');
                console.log(json.message+'Unable to update your details')
            } else {
                props.showalert(`${json.message}`, 'danger');
                console.log(json.message)
            }
        }
        setUserdetail(updatedUser)
    }


    //Delete Note
    const deleteUser = async (id) => {
        console.log("Deleting the id" + id)


        const response = await fetch(`${host}/api/auth/deleteUser/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            // body: JSON.stringify({data}), // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.removeItem("token");
            props.showalert(`${json.message}`, 'success');
            console.log(json.message)
        } else {
            if (json.message === undefined) {
                props.showalert(`Oops unable to delete your account`, 'danger');
                // console.log(json.message+'Unable to add your note')
            } else {
                props.showalert(`${json.message}`, 'danger');
                console.log(json.message)
            }
        }

        //If note._id!==id only then it will stay in notes otherwise it won't
        // const newNote = notes.filter((note) => { return note.user !== id });
        // setNotes(newNote);
    }



    //Fetch all notes
    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
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
                "auth-token": authToken
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });

        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();

        if (json.success) {
            props.showalert(`${json.message}`, 'success');
            console.log(json.message)
        } else {
            if (json.message === undefined) {
                props.showalert(`Oops unable to delete your note`, 'danger');
                console.log(json.message+'Unable to add your note')
            } else {
                props.showalert(`${json.message}`, 'danger');
                console.log(json.message)
            }
        }
        //we are using concat because it return a new array
        setNotes(notes.concat(json.savednote));
    }


    //Delete Note
    const deleteNote = async (id) => {
        console.log("Deleting the id" + id)


        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            // body: JSON.stringify({data}), // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json);

        if (json.success) {
            props.showalert(`${json.message}`, 'success');
            console.log(json.message)
        } else {
            if (json.message === undefined) {
                props.showalert(`Oops unable to delete your note`, 'danger');
                console.log(json.message+'Unable to add your note')
            } else {
                props.showalert(`${json.message}`, 'danger');
                console.log(json.message)
            }
        }

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
                "auth-token": authToken
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json)

        let updatedNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < updatedNotes.length; index++) {
            const element = updatedNotes[index];
            if (element._id === id) {
                updatedNotes[index].title = title;
                updatedNotes[index].description = description;
                updatedNotes[index].tag = tag;
                break;
            }
        }

        if (json.success) {
            props.showalert(`${json.message}`, 'success');
            console.log(json.message)
        } else {
            if (json.message === undefined) {
                props.showalert(`Oops unable to update your note`, 'danger');
                console.log(json.message+'Unable to add your note')
            } else {
                props.showalert(`${json.message}`, 'danger');
                console.log(json.message)
            }
        }
        setNotes(updatedNotes)
    }


    return (
        //Now whenever we will wrap something in between this context, automatically all children will be available in it. 
        //exporting addnote, delete, edit
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes, fetchUser, userdetail, editUser, deleteUser }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;

