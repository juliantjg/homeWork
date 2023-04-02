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
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavBar() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    function handleShow() {
        setShow(true);
    }


    return (
        <div id="notificationBell">
            <button class="btn btn-light" onClick={handleShow}>
                <i class="fas fa-bell fa-3x"></i>
            </button>

            <Offcanvas placement="end" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notifications</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Notifications
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default NavBar;
