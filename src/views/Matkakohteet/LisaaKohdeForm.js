import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMatkakohde } from '../../resources/context/MatkakohdeContext';
import { FileUploaderInput } from "../../components/FileUploader/FileUploaderInput";

const LisaaKohdeForm = () => {

    const navigate = useNavigate();

    const { setMatkakohdeId } = useMatkakohde('');
    const [kohdenimi, setKohdenimi] = useState("");
    const [maa, setMaa] = useState("");
    const [paikkakunta, setPaikkakunta] = useState("");
    const [kuvausteksti, setKuvausteksti] = useState("");
    const [kuva, setKuva] = useState("-1");
    const [uploadFile, setUploadFile] = useState(false);
    const [kuvaSaved, setKuvaSaved] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUploadFile(!uploadFile);
    }

    const handlePeruuta = (event) => {
        event.preventDefault();
        setMatkakohdeId("-1");
        navigate(-1);
    }

    useEffect(() => {
        const lisaa = async () => {
            const response = await fetch("http://localhost:3002/destination", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    kohdenimi: kohdenimi,
                    maa: maa,
                    paikkakunta: paikkakunta,
                    kuvausteksti: kuvausteksti,
                    kuva: kuva,
                }),
            });

            let data = await response.json();
            // console.log("POST (matkakohteiden lisäys): ", data);

            if (response.status.toString().charAt(0) === "2" || response.statusText === "Created") {
                console.log('Matkakohteen lisääminen onnistui!');
                setMatkakohdeId(data.data.insertId);
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Matkakohteen lisääminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        }
        if (uploadFile) lisaa();
    }, [kuva]);

    useEffect(() => {
        const trigger = () => {
            setKuva(""); // jos kuvaa ei valittu, tallennetaan kuvan alkuperäinen tiedostopolku tietokantaan muiden muutosten kanssa
        }
        if (uploadFile && kuva === "-1") trigger();
    }, [kuvaSaved]);

    return (
        <div className="outer">
            <div className="inner ">
                <div className="create ">
                    <h2>Lisää matkakohde</h2>
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
                        <FileUploaderInput url="destination/upload/matkakohde" method="POST" upload={uploadFile} setKuva={setKuva} setKuvaSaved={setKuvaSaved} />
                        <label>Kuvaus:</label>
                        <textarea
                            required
                            value={kuvausteksti}
                            onChange={(e) => setKuvausteksti(e.target.value)}
                        ></textarea>
                        <br />
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Lisää matkakohde</button> {' '}
                        <button onClick={(e) => handlePeruuta(e)}>Peruuta</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { LisaaKohdeForm };
