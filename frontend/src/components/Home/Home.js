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
import { DELETE_JOB_RESET } from '../../actions/types';
import HomeContent from './HomeContent';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    var deleteJobMessageShown = false;

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    const deleteJob = useSelector(state => state.deleteJob)
    const { loading: loadingDeleteJob, message: messageDeleteJob, error: errorDeleteJob } = deleteJob

    function notifyMessage(messageToast) {
        if (deleteJobMessageShown === false) {
            deleteJobMessageShown = true
            toast.success(messageToast, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    useEffect(() => {
        if (messageDeleteJob) {
            dispatch({ type: DELETE_JOB_RESET })
            notifyMessage('Job deleted')
        }

    }, [messageDeleteJob])

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
                                <ToastContainer />
                            </center>

                            <HomeContent />
                        </div>
                        <NavBar />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
