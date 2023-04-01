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
import { getUserDetailsAction } from '../../actions/userActions';
import CryptoJS from 'crypto-js';

function UserProfileContent(id) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currUserId = localStorage.getItem('userIdHomework')
    const currUserRole = localStorage.getItem('roleHomework')
    const userId = id.id
    const profileGravatarUrl = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&f=y"

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    function getRoleLabelColour() {
        if (user.user) {
            var role = user.user.role
            if (role === 'EMPLOYER') return "badge badge-dark"
            else if (role === 'JOB_SEEKER') return "badge badge-success"
        }
    }

    function getRoleLabelText() {
        if (user.user) {
            var role = user.user.role
            if (role === 'EMPLOYER') return "Employer"
            else if (role === 'JOB_SEEKER') return "Job Seeker"
        }
    }

    function generateMD5Hash(string) {
        return CryptoJS.MD5(string).toString();
    }

    function getMd5HashedEmail() {
        if (user.user) {
            var hashed = generateMD5Hash(user.user.email)
            return "https://www.gravatar.com/avatar/" + hashed + "?d=retro&f=y"; // Return the hexadecimal string representation of the hash
        }
    }

    useEffect(() => {
        dispatch(getUserDetailsAction(id.id));
    }, [id.id])

    return (
        <div class="card">
            <div class="card-body">
                <center>
                    {
                        !loading ?
                            (
                                <div>
                                    {
                                        !error ?
                                            (
                                                <div>
                                                    {
                                                        user.user ?
                                                            (
                                                                <div>
                                                                    <span class={getRoleLabelColour()}>{getRoleLabelText()}</span>
                                                                    <br /><br />
                                                                    <img src={getMd5HashedEmail()} id="profileImage" />
                                                                    <br />
                                                                    {user.user.firstname} {user.user.lastname}
                                                                    <br />
                                                                    <small><a href={`mailto:${user.user.email}`} target="_blank" id="userProfileEmail">{user.user.email}</a></small>
                                                                    <br />
                                                                </div>
                                                            ) : null
                                                    }
                                                </div>
                                            )
                                            :
                                            (
                                                <div>{error}</div>
                                            )
                                    }
                                </div>
                            )
                            :
                            (
                                <div>
                                    <br />
                                    <Loader colour="black" />
                                    <br />
                                </div>
                            )
                    }

                </center>
            </div>
        </div>
    );
}

export default UserProfileContent;
