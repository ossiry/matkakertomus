import { useState, useEffect } from "react";
import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const PoistaTarinaButton = (props) => {

    const navigate = useNavigate();
    const [idmatka, setIdMatka] = useState(-1);
    const [matkakohdeid, setMatkakohdeid] = useState(-1);
    const id = props.matkakohde || -1;
    console.log(props.tarina)

    const deleteClicked = (e) => {
        const varmistus = window.confirm(`Haluatko varmasti poistaa tarinan?`);
        if (varmistus) {
            setIdMatka(e.idmatka);
            setMatkakohdeid(e.idmatkakohde)
        }
    };

    useEffect(() => {
        const poista = async () => {
            const response = await fetch("http://localhost:3002/travel/self/stories", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatka: idmatka,
                    idmatkakohde: matkakohdeid
                }),
            })
 
            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                navigate(0); // Tällä päivitetään sama sivu uudelleen
            } else {
                console.log("Virhe tarinaa poistettaessa!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
            }
        };

        if (idmatka !== -1) {
            poista();
        }
    }, [idmatka]);

    return (
        <Button variant="secondary" size="sm" onClick={(e) => deleteClicked(props.tarina)} >
            Poista
        </Button >
    );
}

export { PoistaTarinaButton }