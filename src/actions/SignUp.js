import { useState, useEffect } from "react";
import { useAuth } from "../resources/context/AuthContext";
import { Link } from "react-router-dom";

export default function SignUp() {

  const { setToken } = useAuth('');
  const { setTunnus } = useAuth('');
  const { setId} = useAuth('');

  const [nimimerkki, setNimimerkki] = useState('');
  const [salasana, setSalasana] = useState('');
  const [salasanaToisto, setSalasanaToisto] = useState('');
  const [etunimi, setEtunimi] = useState('');
  const [sukunimi, setSukunimi] = useState('');
  const [email, setEmail] = useState('');
  const [kayttaja, setKayttaja] = useState(null);
  const [virheViesti, setVirheViesti] = useState('');
  const [onnistui, setOnnistui] = useState(false);

  let vvColor = "red";

  const handleSubmit = (event) => {
    event.preventDefault();

    setKayttaja({
      id: "",
      nimimerkki: nimimerkki,
      salasana: salasana,
      salasanaToisto: salasanaToisto,
      etunimi: etunimi,
      sukunimi: sukunimi,
      email: email,
    });
  };

  useEffect(() => {
    const rekisteroidy = async () => {
      const response = await fetch("http://localhost:3002/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nimimerkki: kayttaja.nimimerkki,
          salasana: kayttaja.salasana,
          salasana_toisto: kayttaja.salasanaToisto,
          etunimi: kayttaja.etunimi,
          sukunimi: kayttaja.sukunimi,
          email: kayttaja.email,
        }),
      });

      let data = await response.json();
      console.log("rekisteröityminen, POST-data: ", data);

      if (
        response.status.toString().charAt(0) === 2 ||
        response.statusText === "Created"
      ) {
        sessionStorage.setItem('tunnus', JSON.stringify(data.email)); // myös localStorage sopii
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('user-id', JSON.stringify(data.id));
        setToken(data.token);
        setTunnus(data.email);
        setId(data.id);
        setVirheViesti("");
        setOnnistui(!onnistui);
      } else {
        console.log("msg: ", data.msg);
        setVirheViesti(data.msg);
      }
      setKayttaja(null);
    };
    if (kayttaja !== null) rekisteroidy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kayttaja]);

  return (
    <div className="outer" style={{ background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)" }}>
      <div className="inner">
        {onnistui ? (
          <p data-testid="success2" style={{ fontWeight: "bold" }}>
            Rekisteröityminen onnistui. <br />
            Tervetuloa {etunimi} {sukunimi}! <br />
          </p>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Luo uusi tunnus</h3>

            <div className="form-group">
              <label>Nimimerkki
              <input
                type="text"
                className="form-control"
                value={nimimerkki}
                placeholder="Nimimerkki"
                onChange={(e) => setNimimerkki(e.target.value)}
              /></label>
            </div>

            <div className="form-group">
              <label data-testid="salasanarekisteröidy">Salasana
              <input
                type="password"
                className="form-control"
                value={salasana}
                placeholder="Salasana"
                onChange={(e) => setSalasana(e.target.value)}
              /></label>
            </div>

            <div className="form-group">
              <label>Salasana uudelleen
              <input
                type="password"
                className="form-control"
                value={salasanaToisto}
                placeholder="Salasana uudelleen"
                onChange={(e) => setSalasanaToisto(e.target.value)}
              /></label>
              {salasanaToisto !== "" && salasana !== salasanaToisto ? (
                <p style={{ fontWeight: "bold", color: vvColor }}>
                  Salasanat eivät täsmää.
                </p>
              ) : null}
            </div>

            <div className="form-group">
              <label>Etunimi
              <input
                type="text"
                className="form-control"
                value={etunimi}
                placeholder="Etunimi"
                onChange={(e) => setEtunimi(e.target.value)}
              /></label>
            </div>

            <div className="form-group">
              <label>Sukunimi
              <input
                type="text"
                className="form-control"
                value={sukunimi}
                placeholder="Sukunimi"
                onChange={(e) => setSukunimi(e.target.value)}
              /></label>
            </div>

            <div className="form-group">
              <label>Sähköpostiosoite
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="Sähköpostiosoite"
                onChange={(e) => setEmail(e.target.value)}
              /></label>
            </div>

            <br />
            {virheViesti !== "" ? (
              <p style={{ fontWeight: "bold", color: vvColor }}>
                {virheViesti}
              </p>
            ) : null}

            <button type="submit" data-testid="rekButton" className="btn btn-dark btn-lg btn-block">
              Rekisteröidy
            </button>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"/login"}>
              <p className="forgot-password text-right" style={{ textDecoration: "underline solid blue" }}>
                Oletko jo rekisteröitynyt?
                {/* <button type="button" class="btn btn-link">Kirjaudu sisään</button> */}
              </p></Link>
          </form>
        )}
      </div>
    </div >
  );
}
