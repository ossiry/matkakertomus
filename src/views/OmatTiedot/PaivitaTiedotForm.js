import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const PaivitaTiedotForm = () => {

    const { tunnus, setTunnus } = useAuth("");
    const { token } = useAuth("");
    const { id } = useAuth("");

    const location = useLocation();
    const navigate = useNavigate();
    const [nimimerkki, setNimimerkki] = useState(location.state.nimimerkki);
    const [etunimi, setEtunimi] = useState(location.state.etunimi);
    const [sukunimi, setSukunimi] = useState(location.state.sukunimi);
    const [paikkakunta, setPaikkakunta] = useState(location.state.paikkakunta);
    const [esittely, setEsittely] = useState(location.state.esittely);
    const [query, setQuery] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(!query);
    }

    const handlePeruuta = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    useEffect(() => {
        const paivita = async () => {
            const response = await fetch("http://localhost:3002/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatkaaja: id,
                    email: tunnus,
                    nimimerkki: nimimerkki,
                    etunimi: etunimi,
                    sukunimi: sukunimi,
                    paikkakunta: paikkakunta,
                    esittely: esittely,
                }),
            });

            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                console.log('Profiilin päivittäminen onnistui!');
                toast.success("Profiilin päivittäminen onnistui!");
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Profiilin päivittäminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        };

        if (query) paivita();
    }, [query]);

    return (
        <div className="outer">
            <div className="inner">
                <div className="create">
                    <form>
                        <label>Nimimerkki</label>
                        <input
                            type="text"
                            required
                            value={nimimerkki}
                            onChange={(e) => setNimimerkki(e.target.value)}
                        />
                        <label>Etunimi:</label>
                        <input
                            type="text"
                            required
                            value={etunimi}
                            onChange={(e) => setEtunimi(e.target.value)}
                        />
                        <label>Sukunimi:</label>
                        <input
                            type="text"
                            required
                            value={sukunimi}
                            onChange={(e) => setSukunimi(e.target.value)}
                        />
                        <label>Paikkakunta:</label>
                        <input
                            type="text"
                            required
                            value={paikkakunta}
                            onChange={(e) => setPaikkakunta(e.target.value)}
                        />
                        <label>Esittely:</label>
                        <textarea
                            required
                            value={esittely}
                            onChange={(e) => setEsittely(e.target.value)}
                        ></textarea>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Päivitä tiedot</button> {' '}
                        <button onClick={(e) => handlePeruuta(e)}>Peruuta</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { PaivitaTiedotForm }