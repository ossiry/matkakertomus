import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const MuokkaaMatkaButton = (props) => {

  const { token } = useAuth("");
  const id = props.matka.idmatka || -1;

  let matka = props.matka || [];
  let navigate = useNavigate();

  const muokkaaClicked = (matka) => {
      navigate("/travel/self/update", {
          state: {
            alkupvm: matka.alkupvm,
            loppupvm: matka.loppupvm,
            yksityinen: matka.yksityinen,
            idmatka: matka.idmatka
          },
      });
  };

     return (
      <Button variant="primary" size="sm" disabled={token === null || id === -1}
            onClick={() => muokkaaClicked(matka)} >
            Muokkaa
        </Button>
    );
}





export { MuokkaaMatkaButton };