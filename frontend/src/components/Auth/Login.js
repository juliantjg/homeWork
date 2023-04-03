import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import { USER_LOGOUT } from '../../actions/types';
import Loader from '../Utils/Loader';
import logoMain from '../../images/logoHomework.png'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { error: errorRegister, loading: loadingRegister, userRegister: userRegisterMessage } = userRegister

    function notifyError() {
        // toast(error);
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    useEffect(() => {
        if (error) {
            setLoad(false);
            notifyError()
            dispatch({ type: USER_LOGOUT })
        }
        if (userInfo) {
            setLoad(false);
            navigate('/home')
        }

    }, [error, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        // calling the action
        setLoad(true);
        dispatch(login(username, password))
    }

    return (
        <div class="container-fluid px-0">
            <div id="page-size">
                <div class="col-md-12">
                    <div class="row">
                        <ToastContainer />
                    </div>
                    <br />
                    <div class="row pt-4 justify-content-center">
                        <div class="card p-4" style={{ width: "30rem" }}>
                            <div class="row">
                                <div class="col-md-6">
                                <h1>Login</h1>
                                </div>
                                <div class="col-md-6" align="right">
                                <img src={logoMain} id="logoMainLogin" />
                                </div>
                            </div>
                            <br />
                            <Form
                                onSubmit={submitHandler}
                            >
                                <div class="row">
                                    <div>
                                        <label for="exampleFormControlInput1">Email</label>
                                        <input type="email" required class="form-control input-lg form-control-lg" placeholder="name@example.com" onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div>
                                        <label for="exampleFormControlInput1">Password</label>
                                        <input type="password" required class="form-control input-lg form-control-lg" onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                </div>
                                <br />
                                {
                                    load ?
                                        (
                                            <button type="submit" class="btn btn-secondary btn-lg btn-block" disabled><Loader /></button>
                                        )
                                        :
                                        (
                                            <button type="submit" class="btn btn-secondary btn-lg btn-block">Login</button>
                                        )
                                }

                            </Form>
                            <div align="left">
                                {
                                    load ?
                                        (
                                            <small>
                                                No account yet? <span style={{ color: "grey" }}>Create one</span>
                                            </small>
                                        )
                                        :
                                        (
                                            <small>
                                                No account yet? <Link to="/register">Create one</Link>
                                            </small>
                                        )
                                }
                            </div>
                        </div>

                    </div>
                    <br />

                </div>
            </div>
            <Footer />
        </div >
    );
}

export default Login;
