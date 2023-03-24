import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import NavBar from '../SideBar/NavBar';
import { DELETE_JOB_RESET } from '../../actions/types';

function HomeContent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUserFirstname = localStorage.getItem('firstnameHomework')

    return (
        <div>
            <div class="row p-5">
                <div class="col-md-10 offset-md-1">
                    <span id="welcomeHome"> Welcome, </span>
                    <span id="welcomeHomeName">{authUserFirstname}</span>
                    <br />
                    <span id="welcomeHomeRole">This is your <b>Employer</b> Dashboard</span>
                    <br />
                    <Link to="/create-job">Create Job</Link>
                </div>
            </div>
            <br />
            <div class="row pl-5">
                <div class="col-md-10 offset-md-1">
                    <div class="row">
                        <div class="col-4">
                            <div class="card" id="welcomeHomeCard">
                                <div class="card-body">
                                    <b>3</b> pending applications
                                </div>
                                <Link to="/application-list" id="welcomeHomeCardLink">
                                    <div class="card-footer">
                                        <small>View all</small>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card" id="welcomeHomeCard">
                                <div class="card-body">
                                    <b>5</b> posted jobs
                                </div>
                                <Link to="/posted-jobs" id="welcomeHomeCardLink">
                                    <div class="card-footer">
                                        <small>View all</small>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card" id="welcomeHomeCard">
                                <div class="card-body">
                                    <b>3</b> successful applications
                                </div>
                                <Link to="/application-list" id="welcomeHomeCardLink">
                                    <div class="card-footer">
                                        <small>View all</small>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
