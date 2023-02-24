import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Loader() {
    return (
        <div class="spinner-grow spinner-grow-sm text-light" role="status">
            <span class="sr-only"></span>
        </div>
    );
}

export default Loader;