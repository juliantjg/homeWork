import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';

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
                    <div class="row pt-5">
                        <center>
                            homeWork
                        </center>
                        <ToastContainer />
                    </div>
                    <div class="row pt-4">
                        <div class="col-md-4 offset-4">
                            <div class="card p-4">
                                <h1>Login</h1>
                                <br />
                                <Form
                                    onSubmit={submitHandler}
                                >
                                    <label for="exampleFormControlInput1">Email</label>
                                    <input type="email" class="form-control input-lg" placeholder="name@example.com" onChange={(e) => setUsername(e.target.value)}></input>
                                    <br />
                                    <label for="exampleFormControlInput1">Password</label>
                                    <input type="password" class="form-control input-lg" onChange={(e) => setPassword(e.target.value)}></input>
                                    <br />
                                    <button type="submit" class="btn btn-secondary btn-lg btn-block">Login</button>
                                </Form>
                                <div align="left">
                                    <small>
                                        No account yet? <a href="#">Create one</a>
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
