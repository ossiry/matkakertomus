import logo from '../../resources/images/sekalaiset/hienologo.png'
import React from 'react';
import Card from 'react-bootstrap/Card';
import { MuokkaaKohdettaButton } from './MuokkaaKohdettaButton';
import { PoistaKohdeButton } from './PoistaKohdeButton';
import { useEffect } from 'react';

const MatkakohdeCard = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const matkakohde = props.matkakohde || [];

    // Alla muodostetaan propsina saadusta kuvasta sopiva polku webpacketin require:lle, jolla kuvatiedoston voi tuoda sovellukseen ja src-attribuuttiin
    let polku = matkakohde.kuva || '';
    let virhe = 'resources/images/sekalaiset/no-image.png';
    let alt = 'resources/images/sekalaiset/error-404.png';

    // TODO: Tähän jokin tarkistus vielä, että löytyykö tiedostoa kyseisestä polusta
    if (polku && polku.substring(2, 19) === "resources/images/") { // kaikkien kuvien polut alkavat tästä kansiopolusta
        polku = polku.substring(2); // polku täytyy saada muotoon 'resources/images/sekalaiset/kuvannimi.pääte jotta alla oleva require toimii oikein
        polku = require('../../' + polku); // vaihtoehtona ?? src={${window.location.origin.toString()}/${Image name here}} ??
    } else {
        polku = require('../../' + virhe);
    }

    return (
        <Card style={{}}>
            <Card.Body>
                <Card.Title>
                    {matkakohde.length !== 0 ?
                        matkakohde.kohdenimi :
                        "Tervetuloa!"}
                </Card.Title>
                <Card.Subtitle>
                    {matkakohde.length !== 0 ?
                        matkakohde.paikkakunta + ", " + matkakohde.maa :
                        "Täältä löytyy matkakertomuksia jokaiselle."}
                </Card.Subtitle>
                <Card.Img variant="bottom" style={{ padding: "0.2rem" }}
                    src={matkakohde.length !== 0 ?
                        polku : logo} alt={require('../../' + alt)} />
                <Card.Text style={{ paddingBottom: "1rem" }}>
                    {matkakohde.kuvausteksti}
                </Card.Text>
                <div className="d-grid gap-2">
                    <MuokkaaKohdettaButton matkakohde={matkakohde} />
                    <PoistaKohdeButton matkakohde={matkakohde.idmatkakohde} />
                </div>
            </Card.Body>
        </Card>
    );
}

export { MatkakohdeCard }