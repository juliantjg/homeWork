import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import NavBar from '../SideBar/NavBar';

function JobApplicationListPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // userLogin is from store.js
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        // if userInfo exists then show the home page, this is so that logged in user can't acces /login
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])

    return (
        <div class="container-fluid px-0">

            <div class="container-fluid">
                <div class="row">
                    <MainSideBar />

                    <div class="col-sm p-3 min-vh-100">
                        <div id="page-size">
                            <center>
                                <h2>Applications</h2>
                                <small>A list of all your associated applications</small>
                                <hr />
                            </center>
                            <div class="p-5">

                            </div>
                        </div>
                        <NavBar />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobApplicationListPage;
