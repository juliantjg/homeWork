import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';

function HuntJobsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    return (
        <div class="row">
            <div class="col-3">

            </div>
        </div>
    );
}

export default HuntJobsList;