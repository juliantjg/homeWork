import React from "react";
import { useHistory, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Container } from "react-bootstrap";
import logoMain from '../../images/logoHomework.png'

function MainSideBar() {
    const navigate = useNavigate();
    const currUserRole = localStorage.getItem('roleHomework');
    const currUserId = localStorage.getItem('userIdHomework')

    function logout() {
        localStorage.clear("emailHomework")
        localStorage.clear("tokenHomework")
        localStorage.clear('userIdHomework')
        localStorage.clear('firstnameHomework')
        localStorage.clear('roleHomework')

        navigate('/login')
    }

    return (
        <div class="col-sm-auto bg-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-left sticky-top">
                <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <i class="bi-bootstrap fs-1"></i>
                </a>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-left align-items-left">
                    <li>
                        <div align="center">
                        <img src={logoMain} id="logoMainLogin" />
                        </div>
                        <hr />
                        <li>
                            <Link to="/home" class="nav-link px-0 align-middle" id="sideBarButtons">
                                &nbsp;<i class="fas fa-home"></i> &nbsp; <small>Home</small>&nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <Link to="/hunt-jobs" class="nav-link px-0 align-middle" id="sideBarButtons">
                                &nbsp;<i class="fas fa-briefcase"></i> &nbsp; <small>Hunt Jobs</small>&nbsp;&nbsp;
                            </Link>
                        </li>
                        {
                            (currUserRole === 'EMPLOYER') ?
                                (
                                    <li>
                                        <Link to="/posted-jobs" class="nav-link px-0 align-middle" id="sideBarButtons">
                                            &nbsp;<i class="fas fa-clipboard"></i> &nbsp; <small>Posted Jobs</small>&nbsp;&nbsp;
                                        </Link>
                                    </li>
                                ) : null
                        }
                        <li>
                            <Link to="/application-list" class="nav-link px-0 align-middle" id="sideBarButtons">
                                &nbsp;<i class="fas fa-envelope"></i> &nbsp; <small>Applications</small>&nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <Link to={`/user-profile/${currUserId}`} class="nav-link px-0 align-middle" id="sideBarButtons">
                                &nbsp;<i class="fas fa-user"></i> &nbsp; <small>Profile</small>&nbsp;&nbsp;
                            </Link>
                        </li>
                        <li>
                            <a href="" class="nav-link px-0 align-middle" onClick={() => logout()} id="sideBarButtons">
                                &nbsp;<i class="fas fa-power-off"></i> &nbsp; <small>Logout</small>&nbsp;&nbsp;
                            </a>
                        </li>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainSideBar;