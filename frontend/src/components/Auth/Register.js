import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import { register } from '../../actions/securityActions';
import { USER_LOGOUT } from '../../actions/types';
import Loader from '../Utils/Loader';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [firstname, setFirstname] = useState({});
    const [lastname, setLastname] = useState({});
    const [email, setEmail] = useState({});
    const [password, setPassword] = useState({});
    const [confirmPassword, setConfirmPassword] = useState({});

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { error: errorRegister, loading: loadingRegister, userRegister: userRegisterMessage } = userRegister

    function notifyError() {
        // toast(error);
        toast.error(errorRegister, {
            position: toast.POSITION.TOP_CENTER
        });
        dispatch({ type: USER_LOGOUT })
    }

    useEffect(() => {
        if (errorRegister) {
            setLoad(false);
            notifyError()
        }
        if (userRegisterMessage) {
            toast.success("Register successful. You can now login with your credentials.", {
                position: toast.POSITION.TOP_CENTER
            });
            dispatch({ type: USER_LOGOUT })
            setTimeout(() => {
                setLoad(false);
                navigate('/login')
            }, 3000);

        }

    }, [error, userRegisterMessage, errorRegister])

    useEffect(() => {
        // if userInfo exists then show the home page, this is so that logged in user can't acces /login
        if (userInfo) {
            navigate('/home')
        }
    }, [userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        // calling the action
        if (password !== confirmPassword) {
            toast.error('Confirm password does not match', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        else {
            setLoad(true);
            dispatch(register(firstname, lastname, email, password))
        }
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
                    <div class="row pt-4 justify-content-center">
                        <div class="card p-4" style={{ width: "30rem" }}>
                            <h1>Register</h1>
                            <br />
                            <Form
                                onSubmit={submitHandler}
                            >
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="exampleFormControlInput1">Firstname</label>
                                        <input type="text" class="form-control input-lg" required placeholder="John" onChange={(e) => setFirstname(e.target.value)}></input>
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="exampleFormControlInput1">Lastname</label>
                                        <input type="text" class="form-control input-lg" required placeholder="Doe" onChange={(e) => setLastname(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div>
                                        <label for="exampleFormControlInput1">Email</label>
                                        <input type="email" class="form-control input-lg" required placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row pt-3">
                                    <div class="col-sm-6">
                                        <label for="exampleFormControlInput1">Password</label>
                                        <input type="password" class="form-control input-lg" required onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="exampleFormControlInput1">Confirm Password</label>
                                        <input type="password" class="form-control input-lg" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
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
                                            <button type="submit" class="btn btn-secondary btn-lg btn-block">Register</button>
                                        )
                                }
                            </Form>
                            <div align="left">
                                {
                                    load ?
                                        (
                                            <small>
                                                Back to <span style={{ color: "grey" }}>Login</span>
                                            </small>
                                        )
                                        :
                                        (
                                            <small>
                                                Back to <Link to="/login">Login</Link>
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

export default Register;
