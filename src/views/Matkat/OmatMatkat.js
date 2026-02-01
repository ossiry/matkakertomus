import { useState, useEffect } from "react";
import { MatkaList } from "./MatkaList";
import { useAuth } from '../../resources/context/AuthContext';

export default function Matkat() {
  const { id,setId } = useAuth('');
  const [matkat, setMatkat] = useState([]);
  const [refreshPageCounter, setRefreshPageCounter] = useState(0);
  const [virheviesti, setVirheviesti] = useState("Ladataan matkoja ...")

  useEffect(() => {
    const checkStorage = () => {
      const retrieveUserId = sessionStorage.getItem("user-id") || localStorage.getItem("user-id");

      if (retrieveUserId && !id) {
        const saveUserId = JSON.parse(retrieveUserId);
        setId(saveUserId);
      }increaseCounter()}
      
    if (!id) checkStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseCounter = () => {
    setRefreshPageCounter(refreshPageCounter + 1);
  };

  useEffect(() => {
    const haeMatkat = async () => {
      const response = await fetch("http://localhost:3002/travel/self/"+id, {
        method: "POST",
      });

      let data = await response.json();
      console.log("GET (omien reissujen haku): ", data);

      if (
        response.status.toString().charAt(0) === 2 ||
        response.statusText === "OK"
      ) {
        setMatkat(data.data);
      } else {
        console.log("Virhe reissuja haettaessa", "msg: ", data.msg);
        setVirheviesti(data.msg)
      }
    };
    haeMatkat();
  }, [refreshPageCounter]);

  return (
    <div className="outer">
          <div className="item">
            <MatkaList kohteet={matkat} refresh={increaseCounter} virhe={virheviesti}  />
          </div>
    </div>
  );
};
