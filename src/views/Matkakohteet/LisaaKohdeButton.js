import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const LisaaKohdeButton = () => {

    const { token } = useAuth("");

    let navigate = useNavigate();

    const lisaaClicked = () => {
        navigate("/destination/add");
    };

    return (
        <Button variant="primary" size="lg" disabled={token === null} style={{ padding: "0.2rem" }} onClick={() => lisaaClicked()}>Lisää matkakohde</Button>
    );
};

export { LisaaKohdeButton };