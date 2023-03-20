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
    console.log(job)
    return (
        <Link to={`/job-details/${job.job.id}`}>
            <div class="card p-2" id="jobCard">
                <img class="card-img-top" src="https://i.imgur.com/041jkF8.png" alt="Card image cap" />
                <div class="p-2">
                    <b>{job.job.title}</b> <br />
                    <small>
                        {job.job.location}
                        <br />
                        ${job.job.salary}/hr
                    </small>
                </div>
            </div>
        </Link>
    );
}

export default HuntJobsItem;
