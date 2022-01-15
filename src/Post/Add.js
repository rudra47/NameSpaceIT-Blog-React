import React, { useState } from 'react';
import './post.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login(props) {
    const [state, setState] = useState({
        title: "",
        slug: "",
        body: "",
    });

    const onChangeHandler = (e) => {
        // console.log(e.target.name, e.target.value);
        setState({...state, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/posts", state)
            .then((res) => {
                if (res.type == 'success') {
                    toast.success(res.data.message);
                }else{
                    toast.error(res.data.message);
                }
            })
    }

    return (
        <>
            <h2>Add Post</h2>
            <form onSubmit={onSubmit} className='col-md-6 offset-md-3 loginSection'>
                <div className='row'>
                    <div className="mb-1 col-md-6">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" onChange={onChangeHandler} name='title' required id="title" placeholder="Post Title" />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Slug</label>
                        <input type="text" className="form-control" onChange={onChangeHandler} name='slug' id="slug" placeholder="Post Slub" />
                    </div>
                </div>
                <div className="mb-1 ">
                    <label className="form-label">Body</label>
                    <textarea className='form-control' name='body' id="body" onChange={onChangeHandler} col={3}></textarea>
                </div>
                <div className='mt-3'>
                    <input type="submit" className='btn btn-success form-control'/>
                </div>
            </form>
        </>
    );
}

export default Login;