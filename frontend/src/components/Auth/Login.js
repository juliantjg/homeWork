import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import { USER_LOGOUT } from '../../actions/types';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    console.log(error);

    function notifyError() {
        // toast(error);
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    useEffect(() => {
        if (error) {
            notifyError()
            dispatch({ type: USER_LOGOUT })
        }
        if (userInfo) {

            setTimeout(() => {
                navigate('/home')
            }, 2000);

        }

    }, [error, userInfo])

    useEffect(() => {
        // if userInfo exists then show the home page, this is so that logged in user can't acces /login
        if (userInfo) {
            navigate('/home')
        }
    }, [userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        // calling the action
        dispatch(login(username, password))
    }




    return (
        <div class="container-fluid px-0">
            <div id="page-size">
                <div class="col-md-12">
                    <div class="row pt-2">
                        <center>
                            homeWork
                        </center>
                        <ToastContainer />
                    </div>
                    <br />
                    <div class="row pt-5">
                        <div class="col-md-4 offset-4">
                            <div class="card p-4">
                                <h1>Login</h1>
                                <br />
                                <Form
                                    onSubmit={submitHandler}
                                >
                                    <div class="row">
                                        <div>
                                            <label for="exampleFormControlInput1">Email</label>
                                            <input type="email" class="form-control input-lg" placeholder="name@example.com" onChange={(e) => setUsername(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div class="row pt-3">
                                        <div>
                                            <label for="exampleFormControlInput1">Password</label>
                                            <input type="password" class="form-control input-lg" onChange={(e) => setPassword(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" class="btn btn-secondary btn-lg btn-block">Login</button>
                                </Form>
                                <div align="left">
                                    <small>
                                        No account yet? <Link to="/register">Create one</Link>
                                    </small>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
