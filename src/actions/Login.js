import { useState, useEffect } from "react";
import { useAuth } from "../resources/context/AuthContext";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function Login() {

  const { setToken } = useAuth('');
  const { tunnus, setTunnus } = useAuth('');
  const { setId } = useAuth('');
  // const { setKuva } = useAuth('');

  const [email, setEmail] = useState('');
  const [salasana, setSalasana] = useState('');
  const [etunimi, setEtunimi] = useState("");
  const [sukunimi, setSukunimi] = useState("");
  const [kayttaja, setKayttaja] = useState(null);
  const [checkBoxValinta, setChekBoxValinta] = useState(false);
  const [virheViesti, setVirheViesti] = useState('');

  let vvColor = "red";

  const handleSubmit = (event) => {
    event.preventDefault();
    setKayttaja({ salasana: salasana, email: email });
  };

  const setResults = (data) => {

    if (checkBoxValinta) { // säilyttää tiedot localStoragessa, eli myös selaimen suljettua
      localStorage.setItem('tunnus', JSON.stringify(data.data[0].email));
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('user-id', JSON.stringify(data.data[0].idmatkaaja));
      // localStorage.setItem('user-id', JSON.stringify(data.data[0].kuva));
    } else { // säilyttää tiedot vain selainikkunan sulkeutumiseen asti
      sessionStorage.setItem('tunnus', JSON.stringify(data.data[0].email));
      sessionStorage.setItem('token', JSON.stringify(data.token));
      sessionStorage.setItem('user-id', JSON.stringify(data.data[0].idmatkaaja));
      // sessionStorage.setItem('user-id', JSON.stringify(data.data[0].kuva));
    }

    setToken(data.token);
    setTunnus(data.data[0].email);
    setId(data.data[0].idmatkaaja)
    // setKuva(data.data[0].kuva);
    setEtunimi(data.data[0].etunimi);
    setSukunimi(data.data[0].sukunimi);
    setVirheViesti("");
  }

  useEffect(() => {
    const kirjaudu = async () => {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: kayttaja.email,
          salasana: kayttaja.salasana,
        }),
      });

      let data = await response.json();
      // console.log("kirjautuminen, POST-data: ", data);

      if (
        response.status.toString().charAt(0) === 2 ||
        response.statusText === "OK"
      ) {
        setResults(data);
      } else {
        console.log("msg: ", data.msg);
        setVirheViesti(data.msg);
      }
      setKayttaja(null);
    };
    if (kayttaja !== null) kirjaudu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kayttaja]);



  return (
    <div className="outer" style={{ background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)" }}>
      <div className="inner">
        {tunnus ? (
          <p data-testid="success" style={{ fontWeight: "bold" }}>
            Kirjautuminen onnistui. <br />
            Tervetuloa {etunimi} {sukunimi}! <br />
          </p>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Kirjaudu</h3>
            <div className="form-group">
              <label >Sähköpostiosoite
                <input
                  data-testid="emaillog"
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Sähköpostiosoite"
                  onChange={(e) => setEmail(e.target.value)}
                /></label>
            </div>
            <div className="form-group">
              <label>Salasana
                <input
                  data-testid="salasanalogin"
                  type="password"
                  className="form-control"
                  value={salasana}
                  placeholder="Salasana"
                  onChange={(e) => setSalasana(e.target.value)}
                /></label>
            </div>
            <br />
            {virheViesti !== "" ? (
              <p style={{ fontWeight: "bold", color: vvColor }}>
                {virheViesti}
              </p>
            ) : null}

            <div className="form-group" style={{ display: "flex" }}>
              <button type="submit" data-testid="kirjaudunappula" className="btn btn-dark btn-lg btn-block">
                Kirjaudu
              </button>
              <div className="custom-control custom-checkbox" style={{ display: "flex", marginLeft: "auto", alignItems: "center" }}>
                <input type="checkbox" className="custom-control-input" id="loginCheck" style={{ marginRight: "0.2rem" }}
                  onChange={(e) => setChekBoxValinta(!checkBoxValinta)} />
                <label className="custom-control-label" htmlFor="loginCheck" >Muista valinta?</label>
              </div>
            </div>
            <p className="forgot-password text-right">
              <Button variant="link" size="sm">Unohtuiko salasana?</Button> {/* TODO */}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
