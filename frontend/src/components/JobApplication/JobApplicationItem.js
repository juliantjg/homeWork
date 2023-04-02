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
import UpdateJobApplicationStatusModal from './UpdateJobApplicationStatusModal';

function JobApplicationItem(jobApplication) {

    const [modalShow, setModalShow] = useState(false);
    const authUserId = parseInt(localStorage.getItem("userIdHomework"))

    function getStatusBadge() {
        var status = jobApplication.jobApplication.status
        if (status === 'PENDING') return 'badge badge-info'
        else if (status === 'ACCEPTED') return 'badge badge-success'
        else if (status === 'REJECTED') return 'badge badge-danger'
    }

    console.log(jobApplication.jobApplication)

    return (
        <div class="card" id="jobApplicationCard">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-9">
                        <Link to={`/job-details/${jobApplication.jobApplication.job_id}`} id="jobApplicationCardContent">
                            <b>Job:</b> {jobApplication.jobApplication.job_title}
                        </Link>
                        <br />
                        <Link to={`/user-profile/${jobApplication.jobApplication.applicant_id}`} id="jobApplicationCardContent">
                            <b>Applicant:</b> {jobApplication.jobApplication.applicant_email}
                        </Link>
                    </div>
                    <div class="col-md-3" align="right">
                        {
                            (jobApplication.jobApplication.job_creator_id === authUserId) ?
                                (
                                    <div>
                                        {
                                            (jobApplication.jobApplication.status === 'PENDING') ?
                                                (
                                                    <div>
                                                        <button type="button" class="btn btn-outline-dark" onClick={() => setModalShow(true)}>Update status</button>
                                                        <UpdateJobApplicationStatusModal
                                                            show={modalShow}
                                                            onHide={() => setModalShow(false)}
                                                            application={jobApplication.jobApplication}
                                                        />
                                                        <br />
                                                    </div>
                                                ) : null
                                        }
                                    </div>
                                ) : null
                        }
                        <small>
                            <span class={getStatusBadge()}>Status: {jobApplication.jobApplication.status}</span>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobApplicationItem;
