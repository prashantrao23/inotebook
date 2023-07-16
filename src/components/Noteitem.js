import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-between">
                        <i className="fa-solid fa-pen-to-square " style={{ color: "#0e98dd", cursor: 'pointer'}} onClick={() => { updateNote(note) }} ></i>
                        <i className="fa-sharp fa-solid fa-trash danger" style={{ color: "#dd0e0e",cursor: 'pointer' }} onClick={() => { deleteNote(note._id) }}></i>
                    </div>
                </div>
                <div className="card-footer">
                    <small className="text-body-secondary d-flex justify-content-between"><span>{note.tag}</span> <span>{new Date(note.date).toLocaleString()}</span></small>
                </div>
            </div>
        </div>

    )
}

export default Noteitem
