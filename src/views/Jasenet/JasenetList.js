import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';

const JasenetList = (props) => {

  // console.log("JäsenetLista - props: ", props);

  let jasenet = props.jasenet || [];

  const kayttajat = jasenet.map((j, index) => {

    // Alla muodostetaan propsina saadusta kuvasta sopiva polku webpacketin require:lle, jolla kuvatiedoston voi tuoda sovellukseen ja src-attribuuttiin
    let polku = j.kuva || '';
    let virhe = 'resources/images/sekalaiset/no-image.png';

    // TODO Tähän jokin tarkistus vielä, että löytyykö tiedostoa kyseisestä polusta
    if (polku && polku.substring(2, 19) === "resources/images/") { // kaikkien kuvien polut alkavat tästä kansiopolusta
      polku = polku.substring(2); // polku täytyy saada muotoon 'resources/images/sekalaiset/kuvannimi.pääte jotta alla oleva require toimii oikein
      polku = require('../../' + polku); // vaihtoehtona ?? src={${window.location.origin.toString()}/${Image name here}} ??
    } else {
      polku = require('../../' + virhe);
    }

    if (index % 2 === 0) {
      return (
        <ListGroup as="ul" key={index}>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{j.nimimerkki}</div>
              <p className="mb-0 opacity-75">{j.etunimi} {j.sukunimi}:</p>
              <p className="mb-0 opacity-75" style={{fontStyle: "italic"}}>{j.esittely}</p>
              <small className="opacity-50 text-nowrap">{j.paikkakunta}</small>
            </div>
            <img src={polku} alt="kuva" width="40" height="40" className="rounded-circle flex-shrink-0" ></img>
          </ListGroup.Item>
        </ListGroup>
      );
    } else {
      return null
    }
  });

  return kayttajat.length > 0 ?
    <Card>
      {kayttajat}
    </Card>
    : <h3 style={{ color: "green" }}>{props.virhe}</h3>
  // <h3 style={{color: "lightred" }}>Tyhjää täynnä</h3>;
};

const JasenetList2 = (props) => {

  // console.log("JäsenetLista2 - props: ", props);

  let jasenet = props.jasenet || [];

  const kayttajat = jasenet.map((j, index) => {

    // Alla muodostetaan propsina saadusta kuvasta sopiva polku webpacketin require:lle, jolla kuvatiedoston voi tuoda sovellukseen ja src-attribuuttiin
    let polku = j.kuva || '';
    let virhe = 'resources/images/sekalaiset/no-image.png';

    // TODO Tähän jokin tarkistus vielä, että löytyykö tiedostoa kyseisestä polusta
    if (polku && polku.substring(2, 19) === "resources/images/") { // kaikkien kuvien polut alkavat tästä kansiopolusta
      polku = polku.substring(2); // polku täytyy saada muotoon 'resources/images/sekalaiset/kuvannimi.pääte jotta alla oleva require toimii oikein
      polku = require('../../' + polku); // vaihtoehtona ?? src={${window.location.origin.toString()}/${Image name here}} ??
    } else {
      polku = require('../../' + virhe);
    }

    if (index % 2 !== 0) {
      return (
        <ListGroup as="ul" key={index}>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{j.nimimerkki}</div>
              <p className="mb-0 opacity-75">{j.etunimi} {j.sukunimi}:</p>
              <p className="mb-0 opacity-75" style={{fontStyle: "italic"}}>{j.esittely}</p>
              <small className="opacity-50 text-nowrap">{j.paikkakunta}</small>
            </div>
            <img src={polku} alt="kuva" width="40" height="40" className="rounded-circle flex-shrink-0" ></img>
          </ListGroup.Item>
        </ListGroup>
      );
    } else {
      return null
    }
  });

  return kayttajat.length > 0 ?
    <Card>
      {kayttajat}
    </Card> : <h3 style={{ color: "green" }}>{props.virhe}</h3>
  // <h3 style={{color: "lightred" }}>Tyhjää täynnä</h3>;
};

export { JasenetList, JasenetList2 };



