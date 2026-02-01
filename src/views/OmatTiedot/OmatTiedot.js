import { useState, useEffect } from "react";
import { useAuth } from '../../resources/context/AuthContext';
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaivitaTiedotButton } from "./PaivitaTiedotButton";
import { PaivitaImageButton } from "./PaivitaImageButton";
import { OmatTiedotTable } from "./OmatTIedotTable";
import { useNavigate } from "react-router-dom";
import { VirheViesti1 } from '../../components/VirheViestit';

export default function OmatTiedot() {

  // console.log("OMISSA TIEDOISSA!");
  const navigate = useNavigate();
  const { id, setId } = useAuth("");
  const { token, setToken } = useAuth("");
  const { tunnus, setTunnus } = useAuth("");
  const [email, setEmail] = useState('');
  const [imgSource, setImgSource] = useState("");
  const [virheviesti, setVirheviesti] = useState("");

  const [tiedot, setTiedot] = useState({
    nimimerkki: "",
    etunimi: "",
    sukunimi: "",
    paikkakunta: "",
    kuvaus: "",
    kuva: "",
    email: ""
  });

  let virhe = 'resources/images/sekalaiset/error-404.png';

  const paivitaPolku = (polku) => {
    let def = 'resources/images/sekalaiset/blank-profile.png';

    try {
      // TODO: Tähän jokin tarkistus vielä, että löytyykö tiedostoa kyseisestä polusta
      if (polku && polku.substring(2, 19) === "resources/images/") { // kaikkien kuvien polut alkavat tästä kansiopolusta
        polku = polku.substring(2); // polku täytyy saada muotoon 'resources/images/sekalaiset/kuvannimi.pääte jotta alla oleva require toimii oikein
        polku = require('../../' + polku); // vaihtoehtona ?? src={${window.location.origin.toString()}/${Image name here}} ??
      } else {
        polku = require('../../' + def);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setImgSource(polku);
    }
  }

  useEffect(() => {
    const checkStorage = () => {
      const retrieveTunnus = sessionStorage.getItem("tunnus") || localStorage.getItem("tunnus");
      const retrieveToken = sessionStorage.getItem("token") || localStorage.getItem("token");
      const retrieveUserId = sessionStorage.getItem("user-id") || localStorage.getItem("user-id");

      if (retrieveTunnus && !tunnus) {
        const saveTunnus = JSON.parse(retrieveTunnus);
        setTunnus(saveTunnus);
      }
      if (retrieveToken && !token) {
        const saveToken = JSON.parse(retrieveToken);
        setToken(saveToken);
      }
      if (retrieveUserId && !id) {
        const saveUserId = JSON.parse(retrieveUserId);
        setId(saveUserId);
      }
      setEmail(tunnus);
    }
    if (!tunnus) checkStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const haeTiedot = async () => {
      const response = await fetch("http://localhost:3002/profile?email=" + tunnus, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", "Authorization": token // Authorization: `Bearer ${token}`
        },
      });

      let data = await response.json();
      // console.log("käyttäjän tietojen hakeminen, GET-data: ", data);

      if (response.status === 200 || response.statusText === "OK") {
        setTiedot({
          nimimerkki: data.result[0].nimimerkki, etunimi: data.result[0].etunimi, sukunimi: data.result[0].sukunimi,
          paikkakunta: data.result[0].paikkakunta, kuvaus: data.result[0].esittely, kuva: data.result[0].kuva, email: data.result[0].email
        });

        paivitaPolku(data.result[0].kuva);
      } else {
        console.log("msg: ", data.msg);
        setVirheviesti(data.msg);
      }
    };
    // if (tunnus) haeTiedot();
    if (true) haeTiedot();
  }, [email]);

  if (tiedot.nimimerkki === "") {
    return (
      <Container style={{ paddingBottom: "2rem" }}>
        <Row>
          <div className="d-grid gap-2" style={{ padding: "1rem", }}>
            <Button variant="primary" onClick={(e) => navigate(-1)}>Palaa takaisin</Button>
          </div>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Col sm={8}>
            <Card style={{ padding: "1rem", backgroundColor: "lightblue" }}>
              <VirheViesti1 viesti={virheviesti} kohde={""} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container style={{ position: "relative", padding: "3rem 1rem 3rem 1rem" }}>
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Card>
              <Card.Body>
                <Card.Title>
                  Omat Tiedot
                </Card.Title>
                <hr />
                <OmatTiedotTable tiedot={tiedot} />
                <hr />
                <Card.Subtitle style={{ fontWeight: "bold" }}>
                  Esittely:
                </Card.Subtitle>
                <Card.Text style={{ fontStyle: "italic" }}>
                  {tiedot.kuvaus}
                </Card.Text>
                <hr />
                <PaivitaTiedotButton tiedot={tiedot} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs lg="2" style={{ minWidth: "218px" }}>
            <Card>
              <Card.Img variant="bottom" src={imgSource} alt={require('../../' + virhe)} style={{ maxHeight: "318px", maxWidth: "318px" }}>
              </Card.Img>
              <Card.Body>
                <PaivitaImageButton />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    );
  }
}