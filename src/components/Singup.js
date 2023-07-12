import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {

    const host = 'http://127.0.0.1:5000'
    // const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYjlhODYzMWM4YzAzMDg1Y2E0MmJmIn0sImlhdCI6MTY4ODk2NzgxNH0.qn5Xv8fg21ylRGxWRNBKNwKckieAHKRaU15iYOkdzf8';

    const [credential, setCredential] = useState({ username: "", email: "", password: "" })

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "auth-token": authToken
            },
            body: JSON.stringify({ name: credential.username, email: credential.email, password: credential.password }),
        });

        // return response.json(); // parses JSON response into native JavaScript objects
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect  and save authtoken
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showalert("Account created successfully","success");
        }
        else {
            props.showalert("Enter correct details!!!","danger");
        }

    }

    const onChange = (e) => {

        //Whatever is changing, its value become its name
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {/* onSubmit works on form not on button */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={onChange} value={credential.username} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credential.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credential.password} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="c_password" className="form-label">Confirm Password</label>
                    {/* <input type="password" className="form-control" id="c_password" name="c_password" onChange={onChange} value={credential.password} required/> */}
                </div>

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Singup