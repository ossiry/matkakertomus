import { useState, useEffect } from "react";
import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



const PoistaMatkaButton = (props) => {

    const navigate = useNavigate();
    const [idmatka, setIdMatka] = useState(-1);
    const [matkakohdeid, setMatkakohdeid] = useState(-1);
    const id = props.matka.idmatka || -1;
    let matka = props.matka || [];

    const deleteClicked = (e) => {
        const varmistus = window.confirm(`Haluatko varmasti poistaa matkan?`);
        if (varmistus) {
            setIdMatka(e.idmatka);
        }
    };

    useEffect(() => {
        const poista = async () => {
            const response = await fetch("http://localhost:3002/travel/self", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatka: id,
                }),
            })
 
            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                navigate(0); // Tällä päivitetään sama sivu uudelleen
            } else {
                console.log("Virhe matkaa poistettaessa!"); // TODO: NÄYTÄ VIESTI KÄYTTÄJÄLLE
                navigate(0);
            }
        };

        if (idmatka !== -1) {
            poista();
        }
    }, [idmatka]);

    return (
        <Button variant="secondary" size="sm" onClick={(e) => deleteClicked(matka)} >
            Poista
        </Button >
    );
}





export { PoistaMatkaButton };