import { useState, useEffect } from "react";
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import { MatkakohdeHeader } from "./MatkakohdeHeader";
import { MatkakohdeTable } from './MatkakohdeTable';
import { MatkakohdeCard } from './MatkakohdeCard';


export default function Matkakohteet() {

    const [selectedMatkakohde, setSelectedMatkakohde] = useState([]);
    const [hakuValinnat, setHakuValinnat] = useState({ option: "-1", input: "" });

    function onMatkakohdeClicked(matkakohde) {
        setSelectedMatkakohde(matkakohde);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <Container fluid>
            <Row >
                <Col style={{ padding: "1.5rem 1.5rem 1.5rem 1.5rem" }}>
                    <MatkakohdeHeader setHakuValinnat={setHakuValinnat} />
                </Col>
            </Row>
            <Row>
                <Col sm={6} style={{ padding: "0 0.75rem 1.5rem 1.5rem" }}>
                    <MatkakohdeTable onMatkakohdeClicked={onMatkakohdeClicked} hakuValinnat={hakuValinnat} />
                </Col>
                <Col sm={6} style={{ padding: "0 1.5rem 0 0.75rem" }}>
                    <MatkakohdeCard matkakohde={selectedMatkakohde} />
                </Col>
            </Row>
            <ToastContainer autoClose={1000} />
        </Container>
    );
}