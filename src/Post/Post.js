import React, {useEffect, useState} from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { toast } from 'react-toastify';

function Post () {
    const [state, setState] = useState([]);

    const fetchData = ((pageNumber = 1) => {
        axios.get(`http://localhost:8000/posts?page=${pageNumber}`)
            .then(response => {
                setState(response);
            });
    });

    useEffect(() => {
        fetchData();
    }, []);

    const deleteHandler = (postId) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            axios.delete(`http://localhost:8000/posts/${postId}`)
            .then(response => {
                if (response.data.type == 'success') {
                    // let newData = state?.data?.posts?.data?.filter(data => data.id != postId);
                    // setState(newData);
                    fetchData();
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => toast.error(error));
        } else {
            toast.error('Data Still Safe');
        }
    }

    return (
        <>
            <div className='col-md-6 offset-md-3'>
                <div className='d-flex justify-content-between'>
                    <h2>Post List</h2>
                    <Link 
                        to={{
                            pathname: `/post/add`
                        }}
                        className="btn btn-primary bt-xs mt-3 pull-right"> 
                        Add
                    </Link>
                </div>
                <div className='tableClass'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" width="10%">#</th>
                                <th scope="col" width="20%">Title</th>
                                <th scope="col" width="20%">Slug</th>
                                <th scope="col" width="20%">Body</th>
                                <th scope="col" width="30%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state?.data?.posts?.data?.map((post, key)=>(
                                    <tr key={key}>
                                        <td>{++key}</td>
                                        <td>{post.title}</td>
                                        <td>{post.slug}</td>
                                        <td>{post.body}</td>
                                        <td>
                                        <Link 
                                            to={{
                                                pathname: `/post/edit/${post.id}`, 
                                            }}
                                            className="btn btn-success bt-xs"> 
                                            Edit
                                        </Link>
                                        <button className="btn btn-danger bt-xs" onClick={()=>deleteHandler(post.id)}> 
                                            Delete
                                        </button>

                                        </td>
                                    </tr>
                                ))
                            }
                            
                            <tr>
                                <td colSpan={5}>
                                    <Pagination
                                        activePage={state?.data?.posts?.current_page ? state?.data?.posts?.current_page : 0}
                                        itemsCountPerPage={state?.data?.posts?.per_page ? state?.data?.posts?.per_page : 0 }
                                        totalItemsCount={state?.data?.posts?.total ? state?.data?.posts?.total : 0}
                                        onChange={(pageNumber) => {
                                            fetchData(pageNumber)
                                        }}
                                        pageRangeDisplayed={8}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        firstPageText="First Page"
                                        lastPageText="Last Lage"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Post;