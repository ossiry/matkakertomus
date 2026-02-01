import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const MuokkaaKohdettaButton = (props) => {

    const { token } = useAuth("");
    const id = props.matkakohde.idmatkakohde || -1;

    let matkakohde = props.matkakohde || [];
    let navigate = useNavigate();

    const muokkaaClicked = (matkakohde) => {
        navigate("/destination/update", {
            state: {
                idmatkakohde: matkakohde.idmatkakohde,
                kohdenimi: matkakohde.kohdenimi,
                maa: matkakohde.maa,
                paikkakunta: matkakohde.paikkakunta,
                kuvausteksti: matkakohde.kuvausteksti,
                kuva: matkakohde.kuva,
            },
        });
    };

    return (
        <Button variant="primary" size="lg" disabled={token === null || id === -1}
            onClick={() => muokkaaClicked(matkakohde)} >
            Muokkaa matkakohdetta
        </Button>
    );
}

export { MuokkaaKohdettaButton }