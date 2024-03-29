import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';



const Navbar = (props) => {

    const [mobileMenu, setmobileMenu] = useState(false)
    const [profile, setProfile] = useState(false)
    const context = useContext(noteContext);
    const { userdetail } = context;

    const { showalert } = props;
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
        showalert("Logged Out !!!", "success");
        setProfile(false)
    }
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    return (
        <div className='sticky top-0'>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* <!-- Mobile menu button--> */}
                            <button onClick={() => setmobileMenu(!mobileMenu)} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                {/* <!-- Icon when menu is closed. Menu open: "hidden", Menu closed: "block"--> */}
                                <svg className={`${!mobileMenu ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/* <!-- Icon when menu is open. Menu open: "block", Menu closed: "hidden" --> */}
                                <svg className={`${mobileMenu ? '' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                                    <Link to="/" className={`${location.pathname === '/' ? 'active' : ''} bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Dashboard</Link>

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                            {/* <!-- Profile dropdown start--> */}
                            {!localStorage.getItem('token') ? <div>
                                <Link className="bg-cyan-600 rounded-md p-2 text-white font-semibold mx-1" to="/login" >Login</Link>
                                <Link className="bg-cyan-600 rounded-md p-2 text-white font-semibold mx-1" to="/singup" >Sing Up</Link>
                            </div> : <div className="relative ml-3">
                                <div className='flex'>
                                    {userdetail.user && <p className='text-white font-semibold text-center align-middle mr-2'>{userdetail.user.name}</p>}
                                    <button onClick={() => setProfile(!profile)} type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </button>
                                </div>

                                {/* <!-- Dropdown menu, show/hide based on menu state. Entering: "transition ease-out duration-100" From: "transform opacity-0 scale-95" To: "transform opacity-100 scale-100"
                                    Leaving: "transition ease-in duration-75" From: "transform opacity-100 scale-100" To: "transform opacity-0 scale-95" --> */}

                                {profile && (<div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                    {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                                    <Link to="/user" onClick={() => setProfile(!profile)} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                                    {/* <Link to="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link> */}
                                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</button>
                                </div>
                                )}

                            </div>}
                            {/* Profile dropdown end */}

                        </div>
                    </div>
                </div>

                {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                {mobileMenu && (<div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                        <Link to="/" className={`${location.pathname === '/' ? 'active' : ''}bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium `} aria-current="page">Dashboard</Link>

                    </div>
                </div>
                )}
            </nav>

        </div>
    )
}

export default Navbar