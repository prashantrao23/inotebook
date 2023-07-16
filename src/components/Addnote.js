import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const Addnote = (props) => {

    // const {showalert} = props;
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
       
    }
    const onChange = (e) => {

        //Whatever is changing, its value become its name
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <h2 className='my-2 text-2xl font-bold text-center'>Add a Note</h2>
            <div className='mt-10 p-1 sm:mx-auto sm:w-full max-w-sm lg:max-w-6xl md:max-w-4xl'>
            <form className='space-y-6'>
                <div className="mb-3">
                    <label htmlFor="title" className="block text-sm md:text-lg font-semibold leading-6 text-gray-900">Title</label>
                    <input type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="block text-sm md:text-lg font-semibold leading-6 text-gray-900">Description</label>
                    <textarea rows={4} type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="block text-sm md:text-lg font-semibold leading-6 text-gray-900">Tag</label>
                    <input type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="flex w-auto text-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleClick}>Add Note</button>
            </form>
            </div>
            {/* <div className="my-4"></div> */}
        </div>
    )
}

export default Addnote