import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {

    const host = 'http://127.0.0.1:5000'
    const [credential, setCredential] = useState({ username: "", email: "", password: "" })

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstPassword = e.target.password.value;
        const confirmPassword = e.target.c_password.value;

        if (confirmPassword !== firstPassword) {
            console.log("wrong password")
            props.showalert("Confirm password must be same as password", "danger");

        }
        else {


            const response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                props.showalert(`${json.message}`, "success");
            } else {
                if (json.message === undefined) {
                    props.showalert(`Some error occured, Unable to sign up `, 'danger');
                } else {
                    props.showalert(`${json.message}`, 'danger');
                }
            }

            // if (json.success) {
            //     //redirect  and save authtoken
            //     localStorage.setItem('token', json.authToken);
            //     navigate('/');
            //     props.showalert("Account created successfully", "success");
            // }
            // else {
            //     props.showalert("Enter correct details!!!", "danger");
            // }
        }

    }

    const onChange = (e) => {

        //Whatever is changing, its value become its name
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const onChange_confirm = (e) => {
        if (e.target.value !== credential.password) {
            console.log("Password does not match")
        }
        else {
            console.log("Password matched !!!")
        }
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
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credential.password} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="c_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="c_password" name="c_password" onChange={onChange_confirm} required />
                </div>

                <button type="submit" id="sign_up_btn" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Singup