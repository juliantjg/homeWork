import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Loader(colour) {
    return (
        <div>
            {
                (colour.colour === 'white') ?
                    (
                        <div class="spinner-grow spinner-grow-sm text-light" role="status">
                            <span class="sr-only"></span>
                        </div>
                    )
                    :
                    (
                        <div class="spinner-grow spinner-grow-sm text-dark" role="status">
                            <span class="sr-only"></span>
                        </div>
                    )
            }
        </div>
    );
}

export default Loader;