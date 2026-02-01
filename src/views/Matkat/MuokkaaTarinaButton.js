import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const MuokkaaTarinaButton = (props) => {

  const { token } = useAuth("");

  let matka = props.matka || [];
  let navigate = useNavigate();

  const muokkaaClicked = (tarina) => {
      navigate("/travel/self/stories/update", {
          state: {
            idmatkakohde: tarina.idmatkakohde,
            pvm: tarina.pvm,
            teksti: tarina.teksti,
            idmatka: tarina.idmatka
          },
      });
  };

     return (
      <Button variant="primary" size="sm" disabled={token === null}
            onClick={() => muokkaaClicked(props.tarina)} >
            Muokkaa
        </Button>
    );
}





export { MuokkaaTarinaButton };