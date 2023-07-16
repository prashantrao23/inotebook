import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const host = 'http://127.0.0.1:5000';

    const [credential, setCredential] = useState({ email: "", password: "" })

    let navigate = useNavigate();

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
            <div className='login'>
                <div className='login-form card'>
                    <h1>Login</h1>
                    {/* onSubmit works on form not on button */}
                    <form onSubmit={handleSubmit} className='p-2'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credential.email} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credential.password} />
                        </div>

                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login