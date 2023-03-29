import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import Loader from '../Utils/Loader';
import JobApplicationItem from './JobApplicationItem';
import { getAssociatedJobApplicationsAction } from '../../actions/jobApplicationActions';

function JobApplicationListContent(id) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAssociatedJobApplications = useSelector(state => state.getAssociatedJobApplications)
    const { error, loading, jobApplications } = getAssociatedJobApplications

    const updateJobApplication = useSelector(state => state.updateJobApplication)
    const { error: errorUpdateJobApplication, loading: loadingUpdateJobApplication, message: messageUpdateJobApplication } = updateJobApplication

    useEffect(() => {
        dispatch(getAssociatedJobApplicationsAction("creator-id"));
    }, [messageUpdateJobApplication])

    return (
        <div>
            {
                !loading ?
                    (
                        <div class="p-3">
                            {
                                jobApplications.currentApplications ?
                                    (
                                        <div>
                                            {jobApplications.currentApplications.map(jobApplication => (

                                                <div class="row">
                                                    <JobApplicationItem jobApplication={jobApplication} />
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

export default JobApplicationListContent;
