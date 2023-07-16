import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;


    return (
        <>
            <div className="grid bg-slate-300 rounded-xl hover:shadow-xl ">
                <div className="px-4 pt-2">
                    <h5 className="card-title font-semibold">{note.title}</h5>
                    <p className="card-description ">{note.description}</p>
                    <div className="flex justify-between mt-4">
                        <i className="fa-solid fa-pen-to-square cursor-pointer text-blue-400 hover:text-blue-600 "  onClick={() => { updateNote(note) }} ></i>
                        <i className="fa-sharp fa-solid fa-trash danger cursor-pointer text-red-600 hover:text-red-800 hover:rotate-12 hover:origin-bottom-right" onClick={() => { deleteNote(note._id) }}></i>
                    </div>
                </div>
                <div className="px-4 pb-2 mt-1">
                    <small className="flex justify-between "><span className='font-bold text-slate-500'><i className="fas fa-tag text-slate-700 mt-1"></i> {note.tag}</span> <span className='text-slate-500'>{new Date(note.date).toLocaleString()}</span></small>
                </div>
            </div>
        </>

    )
}

export default Noteitem
