import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate, useParams } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import { deleteJobAction, getJobDetailsAction } from '../../actions/jobActions';
import UpdateJobDetails from './UpdateJobDetails';
import { CREATE_JOB_APPLICATION_RESET, DELETE_JOB_RESET, UPDATE_JOB_DETAILS_RESET } from '../../actions/types';
import Loader from '../Utils/Loader';
import { createJobApplicationAction } from '../../actions/jobApplicationActions';

function JobDetails(id) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currUserRole = localStorage.getItem('roleHomework')

    const [loadUpdateJob, setLoadUpdateJob] = useState(false);
    const [updateDetails, setUpdateDetails] = useState(false);

    const jobDetails = useSelector(state => state.jobDetails)
    const { loading, error, job } = jobDetails

    const updateJobDetails = useSelector(state => state.updateJobDetails)
    const { loading: loadingUpdateJob, message: messageUpdateJob } = updateJobDetails

    const createJobApplication = useSelector(state => state.createJobApplication)
    const { loading: loadingCreateJobApplication, error: errorCreateJobApplication, message: messageCreateJobApplication } = createJobApplication

    const deleteJob = useSelector(state => state.deleteJob)
    const { loading: loadingDeleteJob, message: messageDeleteJob, error: errorDeleteJob } = deleteJob

    const authUserId = parseInt(localStorage.getItem("userIdHomework"))

    function getJobTypeFormatted() {
        if (job.job) {
            var jobType = job.job.jobType
            switch (jobType) {
                case "PET_SITTING":
                    return "Pet Sitting"
            }
            switch (jobType) {
                case "BABY_SITTING":
                    return "Baby Sitting"
            }
            switch (jobType) {
                case "CLEANING":
                    return "Cleaning"
            }
            switch (jobType) {
                case "LAWN_MOWING":
                    return "Lawn Mowing"
            }
            switch (jobType) {
                case "TUTORING":
                    return "Tutoring"
            }
            switch (jobType) {
                case "OTHERS":
                    return "Other"
            }
        }
    }

    function notifyError(errorMessage) {
        toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function notifyMessage(messageToast) {
        toast.success(messageToast, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function updateJobDetailsSwitch() {
        if (updateDetails) setUpdateDetails(false);
        else setUpdateDetails(true);
    }

    function getJobApplicationStatusButtonColour() {
        if (job.job) {
            var application_status = job.job.application_status
            if (application_status === "PENDING") {
                return "btn btn-block btn-secondary"
            }
            else if (application_status === "ACCEPTED") {
                return "btn btn-block btn-primary"
            }
            else if (application_status === "REJECTED") {
                return "btn btn-block btn-danger"
            }
        }
    }

    useEffect(() => {
        dispatch(getJobDetailsAction(id.id));
    }, [id.id, messageUpdateJob, messageCreateJobApplication])

    useEffect(() => {
        if (errorDeleteJob) {
            dispatch({ type: DELETE_JOB_RESET })
            notifyError(errorDeleteJob)
        }
        if (messageDeleteJob) {
            navigate('/home')
        }
    }, [errorDeleteJob, messageDeleteJob])

    useEffect(() => {
        if (errorCreateJobApplication) {
            dispatch({ type: CREATE_JOB_APPLICATION_RESET })
            notifyError(errorCreateJobApplication)
        }
        if (messageCreateJobApplication) {
            dispatch({ type: CREATE_JOB_APPLICATION_RESET })
            notifyMessage(messageCreateJobApplication)
        }
    }, [errorCreateJobApplication, messageCreateJobApplication])

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

    const submitDeleteJob = (e) => {
        e.preventDefault()
        dispatch(deleteJobAction(job.job.id))
    }

    const submitApplyJob = (e) => {
        e.preventDefault()

        var jobApplicationDetails = {
            applicant_id: authUserId,
            job_id: job.job.id
        }

        dispatch(createJobApplicationAction(jobApplicationDetails))
    }

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
                                                            <ToastContainer />
                                                            <h1>{job.job.title}</h1>
                                                            <small>
                                                                ${job.job.salary}/hr
                                                            </small>
                                                            <div align="right">
                                                                {
                                                                    (authUserId === job.job.user_id) ?
                                                                        (
                                                                            <small>
                                                                                <Link to={`/user-profile/${job.job.user_id}`} id="jobDetailsLinkToJobCreator">
                                                                                    Posted by you
                                                                                </Link>
                                                                            </small>
                                                                        )
                                                                        :
                                                                        (
                                                                            <small>
                                                                                <Link to={`/user-profile/${job.job.user_id}`} id="jobDetailsLinkToJobCreator">
                                                                                    Posted by: {job.job.creator_firstname}
                                                                                </Link>
                                                                            </small>
                                                                        )
                                                                }


                                                            </div>
                                                            <hr />
                                                            <b>Type:</b> {getJobTypeFormatted()}
                                                            <br />
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
                                                            <div>
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
                                                                                    <div>
                                                                                        {
                                                                                            loadingDeleteJob ?
                                                                                                (
                                                                                                    <button type="button" disabled class="btn btn-block btn-danger">
                                                                                                        <Loader />
                                                                                                    </button>
                                                                                                )
                                                                                                :
                                                                                                (
                                                                                                    <button type="button" onClick={submitDeleteJob} class="btn btn-block btn-danger">
                                                                                                        Delete job
                                                                                                    </button>
                                                                                                )
                                                                                        }
                                                                                    </div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="p-1">
                                                                        {
                                                                            loadUpdateJob ?
                                                                                (
                                                                                    <button type="button" disabled class="btn btn-block btn-warning">
                                                                                        <Loader colour="white" />
                                                                                    </button>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <Link to={`/application-list-per-job/${job.job.id}`}>
                                                                                        <button type="button" class="btn btn-block btn-warning">
                                                                                            View applications
                                                                                        </button>
                                                                                    </Link>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                {
                                                                    (currUserRole !== 'EMPLOYER') ?
                                                                        (
                                                                            <div>
                                                                                {
                                                                                    (job.job.application_status === null) ?
                                                                                        (
                                                                                            <button type="button" onClick={submitApplyJob} class="btn btn-block btn-secondary">
                                                                                                Apply now
                                                                                            </button>
                                                                                        )
                                                                                        :
                                                                                        (
                                                                                            <button type="button" disabled class={getJobApplicationStatusButtonColour()}>
                                                                                                {job.job.application_status}
                                                                                            </button>
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        ) : null
                                                                }
                                                            </div>
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
