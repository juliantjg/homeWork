import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate, useParams } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import { getJobDetailsAction } from '../../actions/jobActions';

function JobDetails(id) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jobDetails = useSelector(state => state.jobDetails)
    const { loading, error, job } = jobDetails
    // console.log(job)

    useEffect(() => {
        dispatch(getJobDetailsAction(id.id));
    }, [id.id])

    return (

        <div class="card">
            {
                !loading ?
                    (
                        <div>
                            {
                                job.job ?
                                    (
                                        <div>
                                            <div class="card-body">
                                                <h1>{job.job.title}</h1>

                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <small>${job.job.salary}/hr</small>
                                                    </div>
                                                    <div class="col-md-8" align="right">
                                                        <small>Posted by:</small>
                                                    </div>
                                                </div>
                                                <hr />
                                                <b>Location:</b> {job.job.location}
                                                <br />
                                                <b>Postcode:</b> {job.job.postcode}
                                                <br />
                                                <b>Description:</b> {job.job.description}
                                            </div>
                                            <div class="card-footer">
                                                <button type="button" class="btn btn-block btn-secondary">
                                                    Apply now
                                                </button>
                                            </div>
                                        </div>
                                    ) : null
                            }
                        </div>
                    )
                    :
                    (
                        <div>
                            Loading
                        </div>
                    )
            }
        </div>
    );
}

export default JobDetails;
