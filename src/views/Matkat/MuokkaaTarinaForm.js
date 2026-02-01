import "../../stylesheets/matkakohde.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileUploaderInput } from "../../components/FileUploader/FileUploaderInput";

const MuokkaaTarinaForm = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [pvm,setPvm] = useState(location.state.pvm)
    const [idmatkakohde,setIdmatkakohde] = useState(location.state.idmatkakohde)
    const [teksti,setTeksti] = useState(location.state.teksti)
    const [idmatka,setIdmatka] = useState(location.state.idmatka)
    const [muokattu,setMuokattu] = useState(false)
    const [kuva, setKuva] = useState("-1");
    const [uploadFile, setUploadFile] = useState(false);
    const [kuvaSaved, setKuvaSaved] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUploadFile(!uploadFile);
        setMuokattu(!muokattu)
    };

    useEffect(() => {
        const muokkaa = async () => {
            const response = await fetch("http://localhost:3002/travel/self/stories", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pvm:pvm,
                    idmatkakohde:idmatkakohde,
                    teksti:teksti,
                    idmatka: idmatka,
                    kuva:kuva
                }),
            });

            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                console.log('Tarinan päivittäminen onnistui!');
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Tarinan päivittäminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        };

       if (uploadFile) muokkaa();
    }, [kuva]);

    useEffect(() => {
        const trigger = () => {
            console.log("Täällä ollaan")
            setKuva(""); // jos kuvaa ei valittu, tallennetaan kuvan alkuperäinen tiedostopolku tietokantaan muiden muutosten kanssa
        }
        if (uploadFile && kuva === "-1") trigger();
    }, [kuvaSaved]);

    return (
        <div className="outer">
            <div className="inner">
                <div className="create">
                    <h2>Muokkaa tarinaa</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Päivämäärä:</label>
                        <input
                            type="text"
                            required
                            value={pvm}
                            onChange={(e) => setPvm(e.target.value)}
                        />
                        <label>Teksti:</label>
                        <input
                            type="text"
                            required
                            value={teksti}
                            onChange={(e) => setTeksti(e.target.value)}
                        />

                        <label>Lisää kuva:</label>
                        <FileUploaderInput url="travel/self/update/upload/tarina" method="POST" upload={uploadFile} setKuva={setKuva} setKuvaSaved={setKuvaSaved} />
                        <br />
                                          
                        <button>Muokkaa</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { MuokkaaTarinaForm };