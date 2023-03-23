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
import UpdateJobDetails from './UpdateJobDetails';
import { UPDATE_JOB_DETAILS_RESET } from '../../actions/types';
import Loader from '../Utils/Loader';

function JobDetails(id) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loadUpdateJob, setLoadUpdateJob] = useState(false);
    const [updateDetails, setUpdateDetails] = useState(false);

    const jobDetails = useSelector(state => state.jobDetails)
    const { loading, error, job } = jobDetails

    const updateJobDetails = useSelector(state => state.updateJobDetails)
    const { loading: loadingUpdateJob, message: messageUpdateJob } = updateJobDetails

    const authUserId = parseInt(localStorage.getItem("userIdHomework"))

    function updateJobDetailsSwitch() {
        if (updateDetails) setUpdateDetails(false);
        else setUpdateDetails(true);
    }

    useEffect(() => {
        dispatch(getJobDetailsAction(id.id));
    }, [id.id, messageUpdateJob])

    useEffect(() => {
        if (messageUpdateJob) {
            setLoadUpdateJob(true)
            dispatch({ type: UPDATE_JOB_DETAILS_RESET })
            setTimeout(() => {
                updateJobDetailsSwitch()
                setLoadUpdateJob(false)
            }, 2000);
        }
    }, [messageUpdateJob])

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
                                            {
                                                !updateDetails ?
                                                    (
                                                        <div class="card-body">
                                                            <h1>{job.job.title}</h1>
                                                            <small>${job.job.salary}/hr</small>
                                                            <div align="right">
                                                                {
                                                                    (authUserId === job.job.user_id) ?
                                                                        (
                                                                            <small>Posted by you</small>
                                                                        )
                                                                        :
                                                                        (
                                                                            <small>Posted by:</small>
                                                                        )
                                                                }


                                                            </div>
                                                            <hr />
                                                            <b>Location:</b> {job.job.location}
                                                            <br />
                                                            <b>Postcode:</b> {job.job.postcode}
                                                            <br />
                                                            <b>Description:</b> {job.job.description}
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <UpdateJobDetails job={job.job} />
                                                    )
                                            }

                                            <div class="card-footer">
                                                {
                                                    (authUserId === job.job.user_id) ?
                                                        (
                                                            <div class="row">
                                                                <div class="col-md-6 p-1">
                                                                    {
                                                                        updateDetails ?
                                                                            (
                                                                                <div>
                                                                                    {
                                                                                        loadUpdateJob ?
                                                                                            (
                                                                                                <button type="button" disabled onClick={() => updateJobDetailsSwitch()} class="btn btn-block btn-outline-dark"><Loader colour='black' /></button>
                                                                                            )
                                                                                            :
                                                                                            (
                                                                                                <button type="button" onClick={() => updateJobDetailsSwitch()} class="btn btn-block btn-outline-dark">Cancel update</button>
                                                                                            )
                                                                                    }
                                                                                </div>

                                                                            )
                                                                            :
                                                                            (
                                                                                <button type="button" onClick={() => updateJobDetailsSwitch()} class="btn btn-block btn-secondary">Update details</button>
                                                                            )
                                                                    }
                                                                </div>
                                                                <div class="col-md-6 p-1">
                                                                    {
                                                                        loadUpdateJob ?
                                                                            (
                                                                                <button type="button" disabled class="btn btn-block btn-danger">
                                                                                    <Loader colour='white' />
                                                                                </button>
                                                                            )
                                                                            :
                                                                            (
                                                                                <button type="button" class="btn btn-block btn-danger">
                                                                                    Delete job
                                                                                </button>
                                                                            )
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <button type="button" class="btn btn-block btn-secondary">
                                                                Apply now
                                                            </button>
                                                        )
                                                }
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
