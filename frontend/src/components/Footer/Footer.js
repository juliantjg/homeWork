import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <div>
            <footer class="footer">
                <Container>
                    <Row>
                        <div>
                            <hr
                                style={{
                                    color: "white",
                                    backgroundColor: "black",
                                    height: 1,
                                }}
                            />

                            <p>
                                <small className="d-flex justify-content-center">
                                    <b>homeWork @ {year}</b>
                                </small>
                            </p>
                        </div>
                    </Row>
                    <Row xs="auto" className="d-flex justify-content-center">
                        Project by <a href="https://www.linkedin.com/in/juliantj/" target="_blank" id="footerLinks">Julian</a> & <a href="https://www.linkedin.com/in/muhammad-umer-tariq-bbaa91182/" target="_blank" id="footerLinks">Umer</a>
                    </Row>
                    <br />
                </Container>
            </footer>
        </div>
    );
}

export default Footer;