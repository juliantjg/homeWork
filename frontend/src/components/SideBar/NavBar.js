import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Container, Form } from 'react-bootstrap';
import { USER_LOGOUT } from '../../actions/types';
import Loader from '../Utils/Loader';

function NavBar() {

    return (
        <div id="notificationBell">
            <button class="btn btn-light">
                <i class="fas fa-bell fa-3x"></i>
            </button>
        </div>
    );
}

export default NavBar;
