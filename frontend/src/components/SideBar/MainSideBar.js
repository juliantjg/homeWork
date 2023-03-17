import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function MainSideBar() {
    return (
        <div class="col-sm-auto bg-light sticky-top">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-left sticky-top">
                <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                    <i class="bi-bootstrap fs-1"></i>
                </a>
                <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-left align-items-left">
                    <li>
                        <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                <i class="fas fa-home"></i> &nbsp; <small>Home</small>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                <i class="fas fa-briefcase"></i> &nbsp; <small>Jobs</small>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                <i class="fas fa-envelope"></i> &nbsp; <small>Applications</small>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                <i class="fas fa-user"></i> &nbsp; <small>Profile</small>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                <i class="fas fa-power-off"></i> &nbsp; <small>Logout</small>
                            </a>
                        </li>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainSideBar;