import './stylesheets/Matkakertomus.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from "./resources/context/AuthContext";
import SignUp from "./actions/SignUp";
import Login from "./actions/Login";
import Logout from './actions/Logout';
import Koti from "./views/Koti/Koti";

import Matkakohteet from './views/Matkakohteet/Matkakohteet';
import { MuokkaaKohdettaForm } from './views/Matkakohteet/MuokkaaKohdettaForm';
import { LisaaKohdeForm } from './views/Matkakohteet/LisaaKohdeForm';

import PorukanMatkat from "./views/PorukanMatkat/PorukanMatkat";
import { PorukanMatkatImages } from './views/PorukanMatkat/PorukanMatkatImages';

import OmatMatkat from "./views/Matkat/OmatMatkat";
import { LisaaMatkaForm } from './views/Matkat/LisaaMatkaForm';
import { MuokkaaTarinaForm } from './views/Matkat/MuokkaaTarinaForm';
import { TarinanKuvat } from './views/Matkat/TarinanKuvat';


import OmatTiedot from "./views/OmatTiedot/OmatTiedot";
import { PaivitaImageForm } from './views/OmatTiedot/PaivitaImageForm';
import { PaivitaTiedotForm } from './views/OmatTiedot/PaivitaTiedotForm';
import MatkanTarinat from "./views/Matkat/MatkanTarinat";


import { LisaaTarinaForm } from './views/Matkat/LisaaTarinaForm';
import { MuokkaaMatkaForm } from './views/Matkat/MuokkaaMatkaForm';
import Jasenet from "./views/Jasenet/Jasenet";



export default function Matkakertomus() {

  // console.log("MATKAKERTOMUKSESSA!");
  const { id, setId } = useAuth("");
  const { token, setToken } = useAuth("");
  const { tunnus, setTunnus } = useAuth("");

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
    }
    if (!tunnus || !token || !id) checkStorage();
    // tällä ignorataan missing dependencies warningi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="background">
      <div className="App">
        <div className="tummennus2">
          <nav className="navbar navbar-expand-lg border-bottom border-3 ">
            <div className="container">
              <Link
                className="navbar-brand rounded-pill border border-1 p-2 bg-body"
                to={"/"}
              >
                Matkakertomus
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className=" text-white nav-link" to={"/destination"}>
                      Matkakohteet
                    </Link>
                  </li>
                  {tunnus ? (
                    <li className="nav-item">
                      <Link className="text-white nav-link" to={"/travel/all"}>
                        Porukan matkat
                      </Link>
                    </li>
                  ) : null}
                  {tunnus ? (
                    <li className="nav-item">
                      <Link className="text-white nav-link" to={"/travel/self"}>
                        Omat matkat
                      </Link>
                    </li>
                  ) : null}
                  {tunnus ? (
                    <li className="nav-item">
                      <Link className="text-white nav-link" to={"/profile"}>
                        Omat tiedot
                      </Link>
                    </li>
                  ) : null}
                  {tunnus ? (
                    <li className="nav-item">
                      <Link className="text-white nav-link" to={"/members"}>
                        Jäsenet
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="text-end">
                {tunnus ? (
                  <Link
                    className="text-white bg-secondary rounded-pill my-2 nav-link"
                    to={"/profile"}
                  >
                    {tunnus}
                  </Link>
                ) : null}
                {!tunnus ? (
                  <button type="button" className="btn btn-primary">
                    <Link data-testid="kirjaudu"
                      style={{ color: "white" }}
                      className="nav-link"
                      to={"/login"}
                    >
                      Kirjaudu
                    </Link>
                  </button>
                ) : null} {' '}
                {!tunnus ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2 text-white"
                  >
                    <Link data-testid="rekisteröidy"
                      style={{ color: "white" }}
                      className="nav-link"
                      to={"/sign-up"}
                    >
                      Rekisteröidy
                    </Link>
                  </button>
                ) : null}

                {tunnus ? (
                  <Logout setToken={setToken} setTunnus={setTunnus} setId={setId} />
                ) : null}
              </div>
            </div>
          </nav>
          {/* outer classname? */}
          <div >
            <Routes>
              <Route path="/" element={<Koti />} />
              <Route path="/home" element={<Koti />} />
              <Route path="/destination" element={<Matkakohteet />} />
              <Route path="/destination/add" element={<LisaaKohdeForm />} />
              <Route path="/destination/update" element={<MuokkaaKohdettaForm />} />
              <Route path="/travel/all" element={<PorukanMatkat />} />
              <Route path="/travel/all/images" element={<PorukanMatkatImages />} />
              <Route path="/travel/self" element={<OmatMatkat />} />
              <Route path="/travel/self/add" element={<LisaaMatkaForm />} />
              <Route path="/travel/self/update" element={<MuokkaaMatkaForm />} />
              <Route path="/travel/self/stories" element={<MatkanTarinat />} />
              <Route path="/travel/self/stories/images" element={<TarinanKuvat />} />
              <Route path="/travel/self/stories/update" element={<MuokkaaTarinaForm />} />
              <Route path="/travel/self/stories/add" element={<LisaaTarinaForm />} />
              <Route path="/profile" element={<OmatTiedot />} />
              <Route path="/profile/image" element={<PaivitaImageForm />} />
              <Route path="/profile/tiedot" element={<PaivitaTiedotForm />} />
              <Route path="/members" element={<Jasenet />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
        <div className="tummennus3">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="container">
      <footer className="py-3 my-4 ">
        <p className="nav justify-content-center text-info">Tekijät</p>
        <ul className="nav justify-content-center pb-3 mb-3">
          <li className="p-3 text-light">Kaapo Pelkonen</li>
          <li className="p-3 text-light">Joni Kuronen</li>
          <li className="p-3 text-light">Patrik Lappalainen</li>
          <li className="p-3 text-light">Ossi Rytkönen</li>
        </ul>
        <p className="nav justify-content-center text-light">
          &copy; All Right Reserved! 2022
        </p>
      </footer>
    </div>
  );
}
