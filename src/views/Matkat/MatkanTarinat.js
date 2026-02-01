import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TarinaList } from "./TarinaList";
import { useAuth } from '../../resources/context/AuthContext';

export default function Matkat() {

  const location = useLocation();
  const [tarinat, setTarinat] = useState([]);
  const [refreshPageCounter, setRefreshPageCounter] = useState(0);
  const [virheviesti, setVirheviesti] = useState("Ladataan tarinoita")
  const [idMatka] = useState(location.state.id);


  const increaseCounter = () => {
    setRefreshPageCounter(refreshPageCounter + 1);
  };

  useEffect(() => {
    const haeTarinat = async () => {
      console.log("POST (Matkan tarinoiden haku): ");
      const response = await fetch("http://localhost:3002/travel/self/stories/"+idMatka, {
        method: "POST",
      });

      let data = await response.json();
      console.log("GET (omien reissujen haku): ", data);

      if (
        response.status.toString().charAt(0) === 2 ||
        response.statusText === "OK"
      ) {
        setTarinat(data.data);
      } else {
        console.log("Virhe reissuja haettaessa", "msg: ", data.msg);
        setVirheviesti(data.msg)
      }
    };
    haeTarinat();
  }, [refreshPageCounter]);

  return (
    <div className="outer">
          <div class="item">
            <TarinaList tarinat={tarinat} id={idMatka} refresh={increaseCounter} virhe={virheviesti}  />
          </div>
    </div>
  );
};