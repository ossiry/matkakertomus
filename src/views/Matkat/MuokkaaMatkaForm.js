import "../../stylesheets/matkakohde.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MuokkaaMatkaForm = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [alkupvm,setAlkupvm] = useState(location.state.alkupvm)
    const [loppupvm,setLoppupvm] = useState(location.state.loppupvm)
    const [yksityinen,setYksityinen] = useState(location.state.yksityinen)
    const [idmatka,setIdmatka] = useState(location.state.idmatka)
    const [muokattu,setMuokattu] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        setMuokattu(!muokattu)
    };

    useEffect(() => {
        const muokkaa = async () => {
            const response = await fetch("http://localhost:3002/travel/self", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    alkupvm:alkupvm,
                    loppupvm:loppupvm,
                    yksityinen:yksityinen,
                    idmatka: idmatka
                }),
            });

            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                console.log('Matkan päivittäminen onnistui!');
                navigate(-1); // tämä vie edelliselle näytölle
            } else {
                console.log("Matkan päivittäminen epäonnistui!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        };

       if (muokattu) muokkaa();
    }, [muokattu]);


    return (
        <div className="outer">
            <div className="inner">
                <div className="create">
                    <h2>Muokkaa matkaa</h2>
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
                        <label>Yksityinen:</label>
                        <input
                            type="text"
                            required
                            value={yksityinen}
                            onChange={(e) => setYksityinen(e.target.value)}
                        />
                       
                        
                        <button>Muokkaa</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { MuokkaaMatkaForm };
