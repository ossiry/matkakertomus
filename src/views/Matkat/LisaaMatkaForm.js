import { useState, useEffect } from "react";
import { useAuth } from "../../resources/context/AuthContext";
import { useMatkakohde } from '../../resources/context/MatkakohdeContext';
import { useNavigate, useLocation } from "react-router-dom";
import { FileUploaderInput } from "../../components/FileUploader/FileUploaderInput";

const LisaaMatkaForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [alkupvm, setAlkupvm] = useState("")
    const [lisays, setLisays] = useState(null)
    const [loppupvm, setLoppupvm] = useState("")
    const [julkinen, setJulkinen] = useState(0)
    const { id } = useAuth('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (julkinen === true) {
            setJulkinen(1)
        } else {
            setJulkinen(0)
        }
        setLisays(true);
    }

    useEffect(() => {
        const lisaa = async () => {
            const response = await fetch("http://localhost:3002/travel/self/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatkaaja: id,
                    alkupvm: alkupvm,
                    loppupvm: loppupvm,
                    yksityinen: julkinen
                }),
            });

            let data = await response.json();
            // console.log("POST (matkakohteiden lisäys): ", data);

            if (response.status.toString().charAt(0) === "2" || response.statusText === "Created") {
                console.log('Matkan lisääminen onnistui!');
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Matkan lisääminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
                navigate(-1);
            }
        }
        if (lisays) lisaa();
    }, [lisays]);

    return (
        <div className="outer">
            <div className="inner ">
                <div className="create ">
                    <h2>Lisää matka</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>Alkupäivämäärä:</label>
                        <input
                            type="text"
                            required
                            value={alkupvm}
                            onChange={(e) => setAlkupvm(e.target.value)}
                        />
                        <label>Loppupäivämäärä:</label>
                        <input
                            type="text"
                            required
                            value={loppupvm}
                            onChange={(e) => setLoppupvm(e.target.value)}
                        />
                        <div className="custom-control custom-checkbox" style={{ display: "flex" }}>
                            <label className="custom-control-label" htmlFor="yksityinenCheck">Yksityinen</label>
                            <input type="checkbox" value={julkinen} className="custom-control-input"
                                id="yksityinenCheck" style={{}} onChange={(e) => setJulkinen(e.target.checked)} />
                        </div>
                        <button>Lisää Matka</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { LisaaMatkaForm };