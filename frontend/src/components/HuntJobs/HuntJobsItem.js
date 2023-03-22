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

        <div class="card" id="jobCard">
            <Link to={`/job-details/${job.job.id}`} id="huntJobItemContent">
                <div class="p-2">
                    <img class="card-img-top" src="https://i.imgur.com/041jkF8.png" alt="Card image cap" />
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
