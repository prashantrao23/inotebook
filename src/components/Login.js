import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {

    
    const host = 'http://127.0.0.1:5000';

    const [credential, setCredential] = useState({ email: "", password: "" })

    let navigate = useNavigate();

    // if(localStorage.getItem('token')){
    //     navigate('/');
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });

        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect  and save authtoken
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showalert("Logged In successfully", "success");
        }
        else {
            props.showalert("Invalid credentials", "danger");
        }

    }

    const onChange = (e) => {

        //Whatever is changing, its value become its name
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }



    return (
        <>
            {/*
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
*/}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 p-1 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input onChange={onChange} value={credential.email} id="email" name="email" type="email" autoComplete="email" required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    {/* <a to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a> */}
                                </div>
                            </div>
                            <div className="mt-2">
                                <input onChange={onChange} value={credential.password} id="password" name="password" type="password" autoComplete="current-password" required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full text-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/singup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                           Register now
                        </Link>
                    </p>
                </div>
            </div>
        </>

    )
}

export default Login