import { SingleFileUploaderForm } from "../../components/FileUploader/FileUploaderForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../resources/context/AuthContext";
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const PaivitaImageForm = () => {

    const navigate = useNavigate();
    const { id } = useAuth("");
    const [pathToKuva, setPathToKuva] = useState(""); // tähän tallentuu polku kuvaan tiedoston lähettämisen jälkeen

    useEffect(() => {
        const lisaaPolku = async () => {
            const response = await fetch("http://localhost:3002/profile/image", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    kuva: pathToKuva,
                    id: id
                }),
            });

            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                console.log("Profiilikuvan lisääminen onnistui!");
                navigate("/profile");

                // setTimeout(() => {
                //     navigate("/profile"); // tämä vie edelliselle näytölle
                // }, 500);

            } else {
                console.log("Profiilikuvan lisääminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        };

        if (pathToKuva && pathToKuva !== "error") {
            lisaaPolku();
        } else if (pathToKuva === "error") {
            console.log("Tapahtui virhe profiilikuvan lisäämisessä!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            navigate(-1); // tämä vie edelliselle näytölle
        }
    }, [pathToKuva]);

    return (
        <Container style={{ position: "relative", padding: "3rem 1rem 3rem 1rem" }}>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <SingleFileUploaderForm url={"profile/upload/kayttaja"} method="POST" setPathToKuva={setPathToKuva} />
                </Col>
            </Row>
        </Container>
    );
}

export { PaivitaImageForm }