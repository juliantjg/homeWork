import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    function logout() {
        localStorage.clear("emailHomework")
        localStorage.clear("tokenHomework")

        navigate('/login')
    }

    useEffect(() => {
        // if userInfo exists then show the home page, this is so that logged in user can't acces /login
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])

    return (
        <div class="container-fluid px-0">
            <div id="page-size">
                <div class="col-md-12">
                    <div class="row pt-5">
                        <center>
                            Home Page
                            <br />
                            <a href="" onClick={logout()}><i class="fas fa-power-off"></i> Logout</a>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
