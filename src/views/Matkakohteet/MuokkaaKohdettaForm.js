import "../../stylesheets/matkakohde.css";
import React, { useState, useEffect } from "react";
import { useMatkakohde } from '../../resources/context/MatkakohdeContext';
import { useNavigate, useLocation } from "react-router-dom";
import { FileUploaderInput } from '../../components/FileUploader/FileUploaderInput';
import { toast } from 'react-toastify';

const MuokkaaKohdettaForm = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { setMatkakohdeId } = useMatkakohde('');
    const [idMatkakohde] = useState(location.state.idmatkakohde);
    const [kohdenimi, setKohdenimi] = useState(location.state.kohdenimi);
    const [maa, setMaa] = useState(location.state.maa);
    const [paikkakunta, setPaikkakunta] = useState(location.state.paikkakunta);
    const [kuvausteksti, setKuvausteksti] = useState(location.state.kuvausteksti);
    const [kuva, setKuva] = useState("-1");
    const [uploadFile, setUploadFile] = useState(false);
    const [kuvaSaved, setKuvaSaved] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUploadFile(!uploadFile);
    };

    const handlePeruuta = (event) => {
        event.preventDefault();
        setMatkakohdeId("-1");
        navigate(-1);
    }

    useEffect(() => {
        const muokkaa = async () => {
            const response = await fetch("http://localhost:3002/destination", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatkakohde: idMatkakohde,
                    kohdenimi: kohdenimi,
                    maa: maa,
                    paikkakunta: paikkakunta,
                    kuvausteksti: kuvausteksti,
                    kuva: kuva,
                }),
            });

            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                console.log('Matkakohteen päivittäminen onnistui!');
                setMatkakohdeId(idMatkakohde);
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Matkakohteen päivittäminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        };

        if (uploadFile) {
            muokkaa();
        }
    }, [kuva]);

    useEffect(() => {
        const trigger = () => {
            setKuva(location.state.kuva); // jos kuvaa ei valittu, tallennetaan kuvan alkuperäinen tiedostopolku tietokantaan muiden muutosten kanssa
        }
        if (uploadFile && kuva === "-1") trigger();
    }, [kuvaSaved]);

    return (
        <div className="outer">
            <div className="inner">
                <div className="create">
                    <h2>Muokkaa matkakohdetta</h2>
                    <form>
                        <label>Kohdenimi:</label>
                        <input
                            type="text"
                            required
                            value={kohdenimi}
                            onChange={(e) => setKohdenimi(e.target.value)}
                        />
                        <label>Maa:</label>
                        <input
                            type="text"
                            required
                            value={maa}
                            onChange={(e) => setMaa(e.target.value)}
                        />
                        <label>Paikkakunta:</label>
                        <input
                            type="text"
                            required
                            value={paikkakunta}
                            onChange={(e) => setPaikkakunta(e.target.value)}
                        />
                        {/* TODO: SALLITUT TIEDOSTOTYYPIT JA KOOT */}
                        {/* <FileUploaderForm url={"destination/upload/matkakohde/" + idMatkakohde} method="PUT" setKuva={setKuva} upload={uploadFile} /> */}
                        <FileUploaderInput url={"destination/upload/matkakohde"} method="PUT" upload={uploadFile} setKuva={setKuva} setKuvaSaved={setKuvaSaved} />
                        <label>Kuvaus:</label>
                        <textarea
                            required
                            value={kuvausteksti}
                            onChange={(e) => setKuvausteksti(e.target.value)}
                        ></textarea>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Muokkaa kohdetta</button> {' '}
                        <button onClick={(e) => handlePeruuta(e)}>Peruuta</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { MuokkaaKohdettaForm };
