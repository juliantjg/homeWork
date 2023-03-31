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
import { CREATE_JOB_APPLICATION_RESET, DELETE_JOB_RESET, UPDATE_JOB_DETAILS_RESET } from '../../actions/types';
import Loader from '../Utils/Loader';
import { createJobApplicationAction } from '../../actions/jobApplicationActions';

function UserProfileContent(id) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currUserRole = localStorage.getItem('roleHomework')


    return (
        <div class="card">
            {id.id}
        </div>
    );
}

export default UserProfileContent;
