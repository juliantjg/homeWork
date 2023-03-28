import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row, Modal, Button } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import { getAllJobsAction } from '../../actions/jobActions';
import { updateJobApplicationAction } from '../../actions/jobApplicationActions';

function UpdateJobApplicationStatusModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateJobApplicationAction(status, props.application.id))
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton id="confirmDeleteModalHeader">
                <Modal.Title id="contained-modal-title-vcenter">
                    Update application status
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small>
                    <ul>
                        <li>Job: {props.application.job_title}</li>
                        <li>Applicant: {props.application.applicant_email}</li>
                    </ul>
                </small>
                <Form
                    onSubmit={submitHandler}
                >

                    <Form.Control
                        as="select"
                        aria-label="Default select example"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Choose a status</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                    </Form.Control>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide} id="updateSubribbitMemberButtonCancel">Cancel</Button>
                <Button onClick={submitHandler} id="updateSubribbitMemberButtonConfirm">Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateJobApplicationStatusModal;