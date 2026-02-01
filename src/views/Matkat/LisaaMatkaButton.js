import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const LisaaMatkaButton = (props) => {

    const { token } = useAuth("");
    let navigate = useNavigate();
   

    const lisaaClicked = () =>{
        navigate("/travel/self/add", {      
      });
      }

    return (
      <Button style={{ padding: "0.2rem" }} variant="primary" size="lg" disabled={token === null}
      onClick={() => lisaaClicked()} >
      Lisää matka
  </Button>
    );
};

export { LisaaMatkaButton };