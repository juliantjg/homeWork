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
import JobApplicationPerJobList from './JobApplicationPerJobList';

function JobApplicationPerJobPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const match = useParams()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
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
                            <div class="p-5">
                                <Link to={`/job-details/${match.id}`}>
                                    <button type="button" class="btn btn-dark">Back</button>
                                </Link>
                                &nbsp;
                                Showing applications for job ID: <b> {match.id}</b>
                                <br />
                                <JobApplicationPerJobList id={match.id} />
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

export default JobApplicationPerJobPage;
