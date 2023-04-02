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
import { getHomeValuesAction } from '../../actions/userActions';
import Loader from '../Utils/Loader';

function HomeContent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUserRole = localStorage.getItem('roleHomework')
    const authUserFirstname = localStorage.getItem('firstnameHomework')

    const homeValues = useSelector(state => state.homeValues)
    const { loading, error, user } = homeValues

    useEffect(() => {
        dispatch(getHomeValuesAction());
    }, [])
    console.log(user)

    return (
        <div>
            <div class="row p-5">
                <div class="col-md-10 offset-md-1">
                    <span id="welcomeHome"> Welcome, </span>
                    <span id="welcomeHomeName">{authUserFirstname}</span>
                    <br />
                    {
                        (authUserRole === 'EMPLOYER') ?
                            (
                                <div>
                                    <span id="welcomeHomeRole">This is your <b>Employer</b> Dashboard</span>
                                    <br />
                                    <Link to="/create-job">Create Job</Link>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <span id="welcomeHomeRole">This is your <b>Job Seeker</b> Dashboard</span>
                                    <br />
                                    <Link to="/hunt-jobs">Hunt Jobs</Link>
                                </div>
                            )
                    }
                </div>
            </div>
            <br />
            <div class="row pl-5">
                <div class="col-md-10 offset-md-1">
                    {
                        !loading ?
                            (
                                <div>
                                    {
                                        !error ?
                                            (
                                                <div>
                                                    {
                                                        user ?
                                                            (
                                                                <div class="row">
                                                                    <div class="col-4">
                                                                        <div class="card" id="welcomeHomeCard">
                                                                            <div class="card-body">
                                                                                <b>{user.numPendingApplications}</b><br />
                                                                                <small>pending applications</small>
                                                                            </div>
                                                                            <Link to="/application-list" id="welcomeHomeCardLink">
                                                                                <div class="card-footer">
                                                                                    <small>View all</small>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        (authUserRole === "EMPLOYER") ?
                                                                            (
                                                                                <div class="col-4">
                                                                                    <div class="card" id="welcomeHomeCard">
                                                                                        <div class="card-body">
                                                                                            <b>{user.numJobsPostedByCurrUser}</b><br />
                                                                                            <small>posted jobs</small>
                                                                                        </div>
                                                                                        <Link to="/posted-jobs" id="welcomeHomeCardLink">
                                                                                            <div class="card-footer">
                                                                                                <small>View all</small>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            ) : null
                                                                    }
                                                                    <div class="col-4">
                                                                        <div class="card" id="welcomeHomeCard">
                                                                            <div class="card-body">
                                                                                <b>{user.numSuccessfulApplications}</b><br />
                                                                                <small>successful applications</small>
                                                                            </div>
                                                                            <Link to="/application-list" id="welcomeHomeCardLink">
                                                                                <div class="card-footer">
                                                                                    <small>View all</small>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>
                                                    {error}
                                                </div>
                                            )
                                    }
                                </div>
                            )
                            :
                            (
                                <div class="row">
                                    <Loader colour="black" />
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
