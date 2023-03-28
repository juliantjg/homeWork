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

function HuntJobsItem(job) {
    const authUserId = parseInt(localStorage.getItem("userIdHomework"))

    function getJobApplicationStatusBadgeColour() {
        if (job.job) {
            var application_status = job.job.application_status
            if (application_status === "PENDING") {
                return "badge badge-secondary"
            }
            else if (application_status === "ACCEPTED") {
                return "badge badge-primary"
            }
            else if (application_status === "REJECTED") {
                return "badge badge-danger"
            }
        }
    }

    return (

        <div class="card" id="jobCard">
            <Link to={`/job-details/${job.job.id}`} id="huntJobItemContent">
                <div class="p-2">
                    <img class="card-img-top" src="https://i.imgur.com/041jkF8.png" alt="Card image cap" />
                    <div class="card-img-overlay" align="right">
                        {
                            (authUserId === job.job.user_id) ?
                                (
                                    <small>
                                        <span class="badge badge-dark">Owner</span>
                                    </small>
                                )
                                : 
                                (
                                    (job.job.application_status !== null) ?
                                    (
                                        <small>
                                            <span class={getJobApplicationStatusBadgeColour()}>{job.job.application_status}</span>
                                        </small>
                                    ):null
                                )
                        }
                    </div>
                    <div class="p-2">

                        <b>{job.job.title}</b> <br />
                        <small>
                            ${job.job.salary}/hr
                        </small>
                    </div>
                </div>
                <div class="card-footer">
                    <small>{job.job.location}</small>
                </div>
            </Link>
        </div>

    );
}

export default HuntJobsItem;
