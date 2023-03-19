import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import { getAllJobsAction } from '../../actions/jobActions';

function HuntJobsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllJobs = useSelector(state => state.getAllJobs)
    const { error, loading, jobs } = getAllJobs

    useEffect(() => {
        dispatch(getAllJobsAction());
    }, [])

    return (
        <div class="row">
            <div class="col-3">
                {
                    jobs ?
                        (
                            <div>
                                {jobs.map(job => (
                                    <Row>
                                        {job.title}
                                    </Row>
                                ))}
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
        </div>
    );
}

export default HuntJobsList;
