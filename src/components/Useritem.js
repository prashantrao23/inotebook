import React, { useEffect, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";



const Useritem = (props) => {

    const { updateUser, deleteConfirm } = props;
    const context = useContext(noteContext);
    const { userdetail } = context;
    // const [updatedUser, setUpdateduser] = useState('')

    let navigate = useNavigate();
    // console.log(userdetail)

    // const [newUser, setNewUser] = useState(null);
    // const [updatedUserData, setUpdatedUserData] = useState(null);

    // useEffect(() => {
    //     // Perform any necessary logic when newUser changes
    //     if (newUser) {
    //         // Update the updatedUserData state with the new user data
    //         setUpdatedUserData(newUser);
    //     }
    // }, [newUser]); // Include newUser as a dependency in the useEffect hook

    // // Function to handle updating the newUser state
    // const handleUpdateUser = () => {
    //     // ... Update newUser with new data ...
    //     setNewUser(newData);
    // };


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login');
        }
       // eslint-disable-next-line
    }, [])

    const userData = userdetail.user;



    return (
        <div>
            {/* ----------------- user page ------------ */}

            {userData && <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{userdetail.countNotes}</p>
                                <p className="text-gray-400">Total Notes</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">{userData._id}</p>
                                <p className="text-gray-400">ID</p>
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
                            <button onClick={() => { updateUser(userData) }} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Edit
                            </button>
                            <button onClick={() => { deleteConfirm(userData._id) }} className="text-white py-2 px-4 uppercase rounded bg-red-600 hover:bg-red-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                                Deactivate
                            </button>
                        </div>
                    </div>
                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">
                            {userData.name}, <span className="font-light text-gray-500">{userData.age}</span>
                        </h1>
                        <p className="font-light text-gray-600 mt-3">{userData.lastname}, {userData.name}</p>
                        <p className="mt-8 text-gray-500">
                            Email - {userData.email}
                        </p>
                    </div>
                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed praesentium ea est consequuntur nam magnam quis voluptas nisi culpa natus omnis dicta, animi rerum cum nostrum architecto! Officiis, nostrum laborum?
                        </p>

                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Useritem