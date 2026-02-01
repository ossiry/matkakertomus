import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const LisaaTarinaButton = (props) => {

    const { token } = useAuth("");
    let navigate = useNavigate();

    const lisaaClicked = (matka) =>{
        navigate("/travel/self/stories/add", {
          state: {
           id:matka
          },
      });
      }

    return (
      <Button style={{ padding: "0.2rem" }} variant="primary" size="lg" disabled={token === null}
      onClick={() => lisaaClicked(props.id)} >
      Lisää tarina
  </Button>
    );
};

export { LisaaTarinaButton };