import React from 'react'
// import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";



const Useritem = (props) => {

    const { updateNote, detail, deleteConfirm } = props;




    let navigate = useNavigate();
    if (localStorage.getItem(!"token")) {
        navigate('/login');
    }

    return (
        <div>



            {/* ----------------- user page ------------ */}

            <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">22</p>
                                <p className="text-gray-400">Total Notes</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{detail._id}</p>
                                <p className="text-gray-400">User ID</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor" >
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                            <button onClick={() => { updateNote(detail) }} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Edit
                            </button>
                            <button onClick={() => { deleteConfirm(detail._id) }} className="text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Deactivate
                            </button>
                        </div>
                    </div>
                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">
                            {detail.name}, <span className="font-light text-gray-500">27</span>
                        </h1>
                        <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>
                        <p className="mt-8 text-gray-500">
                            {detail.email}
                        </p>
                    </div>
                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed praesentium ea est consequuntur nam magnam quis voluptas nisi culpa natus omnis dicta, animi rerum cum nostrum architecto! Officiis, nostrum laborum?
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Useritem