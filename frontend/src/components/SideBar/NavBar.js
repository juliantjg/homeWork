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
import NotificationItem from '../Notification/NotificationItem';
import { getCurrentUserNotificationsAction } from '../../actions/userActions';

function NavBar() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const getNotification = useSelector(state => state.getNotification)
    const { loading, error, notification } = getNotification

    function handleShow() {
        setShow(true);
        dispatch(getCurrentUserNotificationsAction())
    }

    function notificationsExist() {
        if (notification.notifications) {
            if (notification.notifications.length > 0) return true;
            return false;
        }
        else return false;
    }
    console.log(notification.notifications)

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
                    {
                        loading ? <Loader colour="black" />
                            : error ? 'Error'
                                :
                                notificationsExist() ?
                                    (
                                        <div>
                                            {notification.notifications.map(notifItem => (
                                                <NotificationItem notification={notifItem} />
                                            ))}
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            No notifications yet
                                        </div>
                                    )
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default NavBar;
