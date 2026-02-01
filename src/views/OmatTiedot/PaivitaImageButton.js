import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const PaivitaImageButton = () => {

    const { token } = useAuth("");

    let navigate = useNavigate();

    const paivitaClicked = () => {
        navigate("/profile/image");
    }

    return (
        <div className="d-grid gap-2">
            <Button variant="info" size="sm" disabled={token === null} style={{ padding: "0.2rem" }} onClick={(e) => paivitaClicked(e)}>Päivitä profiilikuva</Button>
        </div>
    );
};

export { PaivitaImageButton };