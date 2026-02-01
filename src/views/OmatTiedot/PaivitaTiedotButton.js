import Button from 'react-bootstrap/Button';
import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";

const PaivitaTiedotButton = (props) => {

    const { token } = useAuth("");

    let navigate = useNavigate();
    let { tiedot } = props;

    const muokkaaTietojaClicked = () => {
        navigate("/profile/tiedot", {
            state : {
                nimimerkki: tiedot.nimimerkki,
                etunimi: tiedot.etunimi,
                sukunimi: tiedot.sukunimi,
                paikkakunta: tiedot.paikkakunta,
                esittely: tiedot.kuvaus,
            }
        });
    }

    return (
        <div className="d-grid gap-2">
            <Button variant="info" size="sm" disabled={token === null} onClick={(e) => muokkaaTietojaClicked(e)}>Muokkaa tietoja</Button>
        </div>
    );
}

export { PaivitaTiedotButton }