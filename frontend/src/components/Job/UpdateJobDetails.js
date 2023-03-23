import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate, useParams } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import { updateJobDetailsAction } from '../../actions/jobActions';
import { UPDATE_JOB_DETAILS_RESET } from '../../actions/types';
import Loader from '../Utils/Loader';

function UpdateJobDetails(job) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [load, setLoad] = useState(false);
    const [title, setTitle] = useState(job.job.title);
    const [salary, setSalary] = useState(job.job.salary);
    const [location, setLocation] = useState(job.job.location);
    const [postcode, setPostcode] = useState(job.job.postcode);
    const [description, setDescription] = useState(job.job.description);

    const updateJobDetails = useSelector(state => state.updateJobDetails)
    const { error, loading, message } = updateJobDetails

    function notifyError(errorMessage) {
        // toast(error);
        toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function notifyMessage(messageToast) {
        // toast(error);
        toast.success(messageToast, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function checkErrors() {
        if (!title || !title.replace(/\s/g, '').length) {
            return 'Title cannot be empty';
        }
        else if (!salary || !salary.toString().replace(/\s/g, '').length) {
            return 'Salary cannot be empty';
        }
        else if (!location || !location.replace(/\s/g, '').length) {
            return 'Location cannot be empty';
        }
        else if (!postcode || !postcode.replace(/\s/g, '').length) {
            return 'Postcode cannot be empty';
        }
        else if (!description || !description.replace(/\s/g, '').length) {
            return 'Description cannot be empty';
        }
        else {
            return '';
        }
    }

    useEffect(() => {
        if (error) {
            setLoad(false);
            notifyError(error)
            dispatch({ type: UPDATE_JOB_DETAILS_RESET })
        }
        if (message) {
            notifyMessage(message)
            dispatch({ type: UPDATE_JOB_DETAILS_RESET })
            setTimeout(() => {
                setLoad(false);
            }, 3000);
        }
    }, [error, message])

    const submitHandler = (e) => {
        e.preventDefault()

        if (checkErrors() === '') {
            setLoad(true)
            var jobDetails = {
                title: title,
                salary: salary,
                location: location,
                postcode: postcode,
                description: description
            }
            dispatch(updateJobDetailsAction(jobDetails, job.job.id))
        }
        else {
            notifyError(checkErrors())
        }
    }

    return (

        <div class="card">
            <div>
                {
                    job.job ?
                        (
                            <div class="card-body">
                                <ToastContainer />
                                <Form onSubmit={submitHandler}>
                                    <div class="form-group row">
                                        <div class="col-md-8">
                                            <label for="updateJobTitleText"><small>Title</small></label><br />
                                            <input
                                                type="email"
                                                required
                                                onChange={(e) => setTitle(e.target.value)}
                                                class="form-control form-control-lg"
                                                id="updateJobTitleText"
                                                value={title}>
                                            </input>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="updateJobTitleText"><small>Salary ($/hr)</small></label><br />
                                            <input
                                                required
                                                type="number"
                                                onChange={(e) => setSalary(e.target.value)}
                                                min="20"
                                                max="100"
                                                class="form-control 
                                                form-control-lg"
                                                id="updateJobTitleText"
                                                value={salary}>
                                            </input>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-8">
                                            <label for="updateJobTitleText"><small>Location</small></label><br />
                                            <input
                                                required
                                                type="text"
                                                onChange={(e) => setLocation(e.target.value)}
                                                class="form-control form-control-lg"
                                                id="updateJobTitleText"
                                                value={location}>
                                            </input>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="updateJobTitleText"><small>Postcode</small></label><br />
                                            <input
                                                required
                                                type="text"
                                                onChange={(e) => setPostcode(e.target.value)}
                                                maxLength="4"
                                                class="form-control form-control-lg"
                                                id="updateJobTitleText"
                                                value={postcode}>
                                            </input>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col">
                                            <label for="updateJobTitleText"><small>Description</small></label><br />
                                            <textarea
                                                required
                                                type="text"
                                                onChange={(e) => setDescription(e.target.value)}
                                                class="form-control form-control-lg"
                                                id="updateJobTitleText"
                                                value={description}>
                                            </textarea>
                                        </div>
                                    </div>
                                    {
                                        load ?
                                            (
                                                <button type="submit" disabled onClick={submitHandler} class="btn btn-block btn-dark"><Loader colour='white' /></button>
                                            )
                                            :
                                            (
                                                <button type="submit" onClick={submitHandler} class="btn btn-block btn-dark">Submit</button>
                                            )
                                    }
                                </Form>
                            </div>
                        ) : null
                }
            </div>
        </div >
    );
}

export default UpdateJobDetails;
