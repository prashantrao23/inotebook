import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';
import Useritem from './Useritem';


const User = (props) => {

    const context = useContext(noteContext);
    const { fetchUser, editUser, deleteUser } = context;
    const { showalert } = props;
    const [modal, setModal] = useState(false)
    const [check, setCheck] = useState(false)
    const [deletemodal, setDeletemodal] = useState(false)
    const [delete_user, setDeleteuser] = useState({ id: "" })
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser();
        }
        else {
            showalert("Login to see your details", "danger");
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const [newUser, setNewuser] = useState({ id: "", username: "", lastname: "", age: "", email: "", password: "", change_password: "" })

    const updateUser = (currentUser) => {
        console.log("After click Edit button from user.js - UpdateNote function from User.js")
        console.log(currentUser);
        setModal(true);
        setNewuser({ id: currentUser._id, username: currentUser.name, lastname: currentUser.lastname, age: currentUser.age, email: currentUser.email, password: "", change_password: "" })
    }

    const deleteConfirm = (user_id) => {
        setDeletemodal(true)
        setDeleteuser({ id: user_id })
     }

    const handleDelete = (e) => {
        deleteUser(delete_user.id);
        setDeletemodal(false);
        navigate('/login');
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log("After click update button in modal " )
        console.log(newUser.id, newUser.username, newUser.lastname, newUser.age, newUser.password, newUser.change_password);
        editUser(newUser.id, newUser.username, newUser.lastname, newUser.age, newUser.password, newUser.change_password);
        //window.location.reload(); //I had to use this so that when i click on update the page get reload
    }
    const onChange = (e) => {
        setNewuser({ ...newUser, [e.target.name]: e.target.value })
    }


    return (
        <div>
            {/* Update user Modal */}
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Update your details {newUser.id}</h3>
                                        <div className="mt-2">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                                    <input type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        id="username" name="username" value={newUser.username} onChange={onChange} minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                                                    <input type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        id="lastname" name="lastname" value={newUser.lastname} onChange={onChange} minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                                                    <input type="number" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        id="age" name="age" value={newUser.age} onChange={onChange} minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                                    <input disabled type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        id="email" name="email" value={newUser.email} onChange={onChange} minLength={5} required />
                                                </div>
                                                <div className="mb-3">
                                                    <input onClick={() => setCheck(!check)}
                                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-blue-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-blue-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                                        type="checkbox"
                                                        role="switch"
                                                        id="flexSwitchCheckDefault" />
                                                    <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="flexSwitchCheckDefault">Change password</label>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                                    <input disabled={check ? false : true} type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        id="password" name="password" value={newUser.password} onChange={onChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="change_password" className="block text-sm font-medium leading-6 text-gray-900">Change Password</label>
                                                    <input disabled={check ? false : true} type="text" className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        id="change_password" name="change_password" value={newUser.change_password} onChange={onChange} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleClick} type="button" className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">Update</button>
                                <button onClick={() => setModal(!modal)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Update user Modal */}

            {/* Delete user modal */}
            <div className={`${deletemodal ? '' : 'hidden'} relative z-10`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

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
                                        <button onClick={() => setDeletemodal(!deletemodal)} className='font-semibold rounded-full text-red-600 flex flex-shrink-0 items-center justify-center bg-red-100 sm:h-10 sm:w-10'>X</button>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Are you sure you want to delete your account?</h3>
                                        <div className="mt-2">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={handleDelete} type="button" className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto">Delete</button>
                                <button onClick={() => setDeletemodal(!deletemodal)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of Delete user Modal */}

            <div>
                {/* {userdetail.map((user)=>{
                    console.log({key:user.user._id})
                    return <div className="" key={user.user._id}>
                        <Useritem detail={user.user} updateNote={updateNote} deleteConfirm={deleteConfirm} />
                        </div>
                })} */}

                <Useritem updateUser={updateUser} deleteConfirm={deleteConfirm} />

            </div>
        </div>
    )
}

export default User