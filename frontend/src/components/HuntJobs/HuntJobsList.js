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
import HuntJobsItem from './HuntJobsItem';
import Loader from '../Utils/Loader';

function HuntJobsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllJobs = useSelector(state => state.getAllJobs)
    const { error, loading, jobs } = getAllJobs

    useEffect(() => {
        dispatch(getAllJobsAction());
    }, [])

    return (
        <div>
            {
                !loading ?
                    (
                        <div>
                            {
                                jobs ?
                                    (
                                        <div class="row">
                                            {jobs.map(job => (

                                                <div class="col-md-4">
                                                    <HuntJobsItem job={job} />
                                                    <br />
                                                </div>
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
                    )
                    :
                    (
                        <div align="center">
                            <Loader colour="black" />
                        </div>
                    )
            }
        </div >
    );
}

export default HuntJobsList;
