import React, { useState, useEffect } from 'react';
import { useHistory, Link, useNavigate, useParams } from 'react-router-dom';
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import { Form, Row } from 'react-bootstrap';
import MainSideBar from '../SideBar/MainSideBar';
import { getJobDetailsAction } from '../../actions/jobActions';

function UpdateJobDetails(job) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(job.job.title);
    const [salary, setSalary] = useState(job.job.salary);
    const [location, setLocation] = useState(job.job.location);
    const [postcode, setPostcode] = useState(job.job.postcode);
    const [description, setDescription] = useState(job.job.description);

    const authUserId = parseInt(localStorage.getItem("userIdHomework"))

    return (

        <div class="card">
            <div>
                {
                    job.job ?
                        (
                            <div class="card-body">
                                <div class="form">
                                    <div class="form-group row">
                                        <div class="col-md-8">
                                            <label for="updateJobTitleText"><small>Title</small></label><br />
                                            <input
                                                required
                                                type="text"
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

                                    <button type="submit" class="btn btn-block btn-dark">Submit</button>
                                </div>
                            </div>
                        ) : null
                }
            </div>
        </div >
    );
}

export default UpdateJobDetails;
