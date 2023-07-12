import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {


    const {showalert}=props;
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote } = context;

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes();
        }
        else{
            showalert("Login to see your notes","danger");
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)


    const [note, setNote] = useState({ id: "", e_title: "", e_description: "", e_tag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        //because we are getting values as in title, description, tag, so we are assigning them to e_title
        setNote({ id: currentNote._id, e_title: currentNote.title, e_description: currentNote.description, e_tag: currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("Updating note...")
        editNote(note.id, note.e_title, note.e_description, note.e_tag);
        refClose.current.click();
        console.log("Updated!!!")
        showalert("Updated Successfully !!","success")
    }
    const onChange = (e) => {
        //Whatever is changing, its value become its name
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Addnote showalert={showalert}/>

            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="e_title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="e_title" name="e_title" value={note.e_title} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="e_description" name="e_description" value={note.e_description} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="e_tag" name="e_tag" value={note.e_tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.e_title.length<5 || note.e_description.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="">Your Notes</h2>
            <div className="row">
                <div className='container'>
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <div className="col-sm-3 my-3 mb-sm-0" key={note._id}>
                        <Noteitem note={note} updateNote={updateNote} showalert={showalert}/>
                    </div>;
                })}

            </div>
        </div>
    )
}

export default Notes