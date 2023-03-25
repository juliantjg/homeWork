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

function JobApplicationItem(jobApplication) {
    return (

        <div class="card" id="jobApplicationCard">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-9">
                        <div class="row">
                            Job: {jobApplication.jobApplication.job_id}
                        </div>
                        <div class="row">
                            User: {jobApplication.jobApplication.applicant_id}
                        </div>
                    </div>
                    <div class="col-md-3" align="right">
                        <button type="button" class="btn btn-outline-dark">Update</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default JobApplicationItem;
