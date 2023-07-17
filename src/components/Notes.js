import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {


    const { showalert } = props;
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote } = context;
    const [modal, setModal] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchNotes();
        }
        else {
            showalert("Login to see your notes", "danger");
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    // const ref = useRef(null)
    // const refClose = useRef(null)


    const [note, setNote] = useState({ id: "", e_title: "", e_description: "", e_tag: "" })

    const updateNote = (currentNote) => {
        setModal(true)
        // ref.current.click();
        //because we are getting values as in title, description, tag, so we are assigning them to e_title
        setNote({ id: currentNote._id, e_title: currentNote.title, e_description: currentNote.description, e_tag: currentNote.tag })
    }

    const handleClick = (e) => {

        editNote(note.id, note.e_title, note.e_description, note.e_tag);
        // refClose.current.click();

    }
    const onChange = (e) => {
        //Whatever is changing, its value become its name
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Addnote />

           {/* <!-- Modal --> */}
            <div className={`${modal ? '' : 'hidden'} relative z-10`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-xl lg:max-w-4xl">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="">
                                    <div className="mx-auto flex h-12 w-auto justify-between   sm:mx-0 sm:h-10 ">
                                        <div className='flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10'>
                                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <button onClick={() => setModal(!modal)} className='font-semibold rounded-full text-red-600 flex flex-shrink-0 items-center justify-center bg-red-100 sm:h-10 sm:w-10'>X</button>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Edit Note</h3>
                                        <div className="mt-2">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="e_title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                                    <input type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                                    id="e_title" name="e_title" value={note.e_title} onChange={onChange} minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="e_description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                                    <textarea rows={6} type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                                    id="e_description" name="e_description" value={note.e_description} onChange={onChange} minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="e_tag" className="block text-sm font-medium leading-6 text-gray-900">Tag</label>
                                                    <input type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                                    id="e_tag" name="e_tag" value={note.e_tag} onChange={onChange} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button disabled={note.e_title.length < 5 || note.e_description.length < 5} onClick={handleClick} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">Update</button>
                                <button onClick={() => setModal(!modal)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-5'>
            <h2 className="text-xl font-bold ml-5">Your Notes :-</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 p-4">
                {notes.length === 0 && <div className=''>
                    No Notes to display
                </div>}
                {notes.map((note) => {
                    return <div className="" key={note._id}>
                        <Noteitem note={note} updateNote={updateNote} />
                    </div>;
                })}

            </div>
            </div>
            
        </div>
    )
}

export default Notes