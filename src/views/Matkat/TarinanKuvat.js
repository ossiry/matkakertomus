import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TarinanKuvat = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [polut, setPolut] = useState([]);

    let idmatka = location.state.idmatka || "-1";
    let idmatkakohde = location.state.idmatkakohde || "-1";

    console.log("IDMATKA: ", idmatka);
    console.log("IDMATKAKOHDE: ", idmatkakohde);

    useEffect(() => {
        const haeKuvat = async () => {

            let url = "http://localhost:3002/travel/all/images?idmatka=" + idmatka + "&idmatkakohde=" + idmatkakohde;
            const response = await fetch(url, {
                method: "GET",
            });

            let data = await response.json();
            // console.log("GET (kuvien haku): ", data);
            if (
                response.status.toString().charAt(0) === 2 ||
                response.statusText === "OK"
            ) {
                setPolut(data.data);
            } else {
                console.log("Virhe kuvia haettaessa", "msg: ", data.msg);
            }
        }
        if (idmatka !== "-1" && idmatkakohde !== "-1") haeKuvat()
    }, []);

    console.log("POLUT:", polut);
    //  minWidth: "436px", maxWidth: "436px"
    const kuvat = polut.map((p, index) => {

        let virhe = 'resources/images/sekalaiset/no-image.png';
        let alt = 'resources/images/sekalaiset/error-404.png';
        let kuva = p.kuva;

        // TODO: Tähän jokin tarkistus vielä, että löytyykö tiedostoa kyseisestä polusta
        if (kuva && kuva.substring(2, 19) === "resources/images/") { // kaikkien kuvien polut alkavat tästä kansiopolusta
            kuva = kuva.substring(2); // polku täytyy saada muotoon 'resources/images/sekalaiset/kuvannimi.pääte jotta alla oleva require toimii oikein
            kuva = require('../../' + kuva); // vaihtoehtona ?? src={${window.location.origin.toString()}/${Image name here}} ??
        } else {
            kuva = require('../../' + virhe);
        }

        console.log("KUVA: ", kuva);

        return (
            <Row style={{ justifyContent: "center" }}>
                <Col sm={10}>
                    <Card style={{ padding: "0.5rem", alignItems: "center", backgroundColor: "lightblue" }}>
                        <Card.Img variant="bottom" style={{ padding: "0.2rem", maxWidth: "90%", }} src={kuva} alt={require('../../' + alt)} />
                    </Card>
                    <br />
                </Col>
            </Row>
        );
    });

    return (
        <Container >
            <Row>
                <div className="d-grid gap-2" style={{ padding: "1rem" }}>
                    <Button variant="primary" onClick={(e) => navigate(-1)}>Palaa takaisin</Button>
                </div>
            </Row>
            {kuvat}
        </Container>
    );
}

export { TarinanKuvat }