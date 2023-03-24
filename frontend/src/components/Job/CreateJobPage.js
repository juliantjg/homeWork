import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate, useParams } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import NavBar from '../SideBar/NavBar';
import JobDetails from './JobDetails';
import CreateJob from './CreateJob';

function CreateJobPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const match = useParams()

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
                                <h2>Create a Job</h2>
                                <hr />
                            </center>
                            <div class="p-5">
                                <div class="col-md-6 offset-md-3">
                                    <CreateJob />
                                </div>
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

export default CreateJobPage;
