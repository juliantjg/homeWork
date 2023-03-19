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

function JobDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllJobsAction());
    }, [])

    return (
        <div>
        </div>
    );
}

export default JobDetails;
