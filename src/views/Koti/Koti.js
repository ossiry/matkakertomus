import { useState, useEffect } from "react";
import { useAuth } from "../../resources/context/AuthContext";
import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';
import "../../stylesheets/Matkakertomus.css";

export default function Koti() {
  const [matkakohteet, setMatkakohteet] = useState([]);
  const [refreshPageCounter, setRefreshPageCounter] = useState(0);
  const { token } = useAuth("");

  const increaseCounter = () => {
    setRefreshPageCounter(refreshPageCounter + 1);
  };

  useEffect(() => {
    const haeKohteet = async () => {
      const response = await fetch("http://localhost:3002/destination/popular", {
        method: "GET",
      });

      let data = await response.json();
      // console.log("GET (matkakohteiden haku): ", data);

      if (
        response.status.toString().charAt(0) === 2 ||
        response.statusText === "OK"
      ) {
        setMatkakohteet(data.data);
      } else {
        console.log("Virhe matkakohteita haettaessa", "msg: ", data.msg);
      }
    };
    haeKohteet();
  }, [refreshPageCounter]);

  return (
    <div>
      <main className="main">
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light text-light">
                Tervetuloa Matkakertomuksiin
              </h1>
              <p className="lead text-secondary">
                Täältä löytyy kertomuksia jokaiselle
              </p>
              <p>
                {token !== null ? (
                  <Link to={"/travel/all"}>
                    <button
                      type="button"
                      disabled={token === null}
                      className="btn btn-primary my-2"
                    >
                      Kertomuksiin
                    </button>
                  </Link>
                ) : (
                  <Link
                    className="btn btn-primary my-2"
                    to={"/login"}
                  >
                    Kertomuksiin
                  </Link>
                )}
              </p>
            </div>
          </div>
        </section>
        <div className="album py-5" >
          <div className="container">
            <h4 className="text-center text-light ">SUOSITUIMMAT KOHTEET</h4>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-3">
              {matkakohteet.map((i, index) => {
                return <KohdeKuva key={index} image={i.kuva} teksti={i.kohdenimi} />;
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function KohdeKuva(props) {

  const { token } = useAuth("");

  let virhe = 'resources/images/sekalaiset/no-image.png';
  // let virhe = 'resources/images/sekalaiset/error-404.png';
  // let virhe = 'resources/images/sekalaiset/erorr.jpg';
  let polku = props.image || '';

  if (polku !== '' && polku.substring(2, 19) === "resources/images/") {
    // polku = require(`${polku}`);
    polku = polku.substring(2);
    polku = require('../../' + polku);
  } else {
    polku = require('../../' + virhe);
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        {/* <img src={polku} alt="not found"></img> */}
        <Image src={polku} thumbnail />
        <div className="card-body">
          <p className="card-text">{props.teksti}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {token !== null ? (
                <Link to={"/travel/all"}>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Katsele
                  </button>
                </Link>
              ) : (
                <Link
                  className="btn btn-sm btn-outline-secondary"
                  to={"/login"}
                >
                  Kertomuksiin
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}