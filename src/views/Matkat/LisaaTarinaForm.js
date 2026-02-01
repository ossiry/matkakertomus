import { useState, useEffect } from "react";
import { useMatkakohde } from '../../resources/context/MatkakohdeContext';
import { useNavigate, useLocation } from "react-router-dom";
import { FileUploaderInput } from "../../components/FileUploader/FileUploaderInput";

const LisaaTarinaForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [idMatka] = useState(location.state.id);
    const [teksti,setTeksti] = useState("");
    const [pvm,setPvm] = useState("");
    const [kohde,setKohde]= useState("");
    const [kuva, setKuva] = useState("-1");
    const [uploadFile, setUploadFile] = useState(false);
    const [kuvaSaved, setKuvaSaved] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUploadFile(!uploadFile);
    }

    useEffect(() => {
        const lisaa = async () => {
            const response = await fetch("http://localhost:3002/travel/self/stories/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatkakohde: kohde,
                    pvm: pvm,
                    teksti: teksti,
                    kuva: kuva,
                    idmatka: idMatka            
                }),
            });

            let data = await response.json();
            // console.log("POST (matkakohteiden lisäys): ", data);

            if (response.status.toString().charAt(0) === "2" || response.statusText === "Created") {
                console.log('Tarinan lisääminen onnistui!');
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Tarinan lisääminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
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
                    <h2>Lisää tarina</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Kohde:</label>
                        <input
                            type="text"
                            required
                            value={kohde}
                            onChange={(e) => setKohde(e.target.value)}
                        />
                        <label>Päivämäärä:</label>
                        <input
                            type="text"
                            required
                            value={pvm}
                            onChange={(e) => setPvm(e.target.value)}
                        />
                        <label>Kuvaus:</label>
                        <input
                            type="text"
                            required
                            value={teksti}
                            onChange={(e) => setTeksti(e.target.value)}
                        />
                        <br />
                        <FileUploaderInput url="travel/self/upload/tarina" method="POST" upload={uploadFile} setKuva={setKuva} setKuvaSaved={setKuvaSaved} />
                        <br/>
                        <button>Lisää Tarina</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { LisaaTarinaForm };