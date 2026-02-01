import { useState, useEffect } from "react";
import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const PoistaKohdeButton = (props) => {

    const { token } = useAuth("");
    const navigate = useNavigate();
    const [poistettavaId, setPoistettavaId] = useState(-1);
    const id = props.matkakohde || -1;

    const deleteClicked = (e) => {
        const varmistus = window.confirm(`Haluatko varmasti poistaa matkakohteen?`);
        if (varmistus) {
            setPoistettavaId(id);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const poista = async () => {
            const response = await fetch("http://localhost:3002/destination", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idmatkakohde: poistettavaId
                }),
            })
            toast.success("Matkakohteen poistaminen onnistui!");
            console.log("Matkakohteen poistaminen onnistui!");
            if (response.status.toString().charAt(0) === "2" || response.statusText === "No Content") {
                setTimeout(() => {
                    navigate(0); // Tällä päivitetään sama sivu uudelleen
                }, 1500);

            } else {
                toast.error("Virhe matkakohdetta poistettaessa!");
                console.log("Virhe matkakohteita poistettaessa!");
                setTimeout(() => {
                    navigate(0); // Tällä päivitetään sama sivu uudelleen
                }, 1500);
            }
        };

        if (poistettavaId !== -1) {
            poista();
        }
    }, [poistettavaId]);

    return (
        <Button variant="secondary" size="lg" disabled={token === null || id === -1} onClick={(e) => deleteClicked(e)} >
            Poista matkakohde
        </Button >
    );
}

export { PoistaKohdeButton }




