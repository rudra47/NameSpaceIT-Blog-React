import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

function Login(props) {
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        // console.log(e.target.name, e.target.value);
        setState({...state, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // console.log({response});
            axios.post("http://localhost:8000/userLogin", state)
                .then((res) => {
                    console.log(res.data);
                })
        });
    }

    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={onSubmit} className='col-md-4 offset-md-4 loginSection'>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChangeHandler} name='email' id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChangeHandler} name='password' id="password" placeholder="*****" />
                </div>
                <div className=''>
                    <input type="submit" className='btn btn-success form-control'/>
                </div>
            </form>
        </>
    );
}

export default Login;