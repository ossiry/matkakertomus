import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const MatkanTarinatButton = (props) => {

    const { token } = useAuth("");
    let matka = props.matka || [];
    let navigate = useNavigate();

    const tarinatClicked = (matka) => {
        navigate("/travel/self/stories", {
            state: {
             id:matka.idmatka
            },
        });
    };

     return (

         <Button variant="primary" size="sm" disabled={token === null}
            onClick={() => tarinatClicked(props.matka)} >
            Tarinat
         </Button>

      
    );
}





export { MatkanTarinatButton };