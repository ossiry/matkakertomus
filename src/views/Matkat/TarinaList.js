import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { VirheViesti1 } from '../../components/VirheViestit';
import { useAuth } from "../../resources/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LisaaTarinaButton } from './LisaaTarinaButton';
import { PoistaTarinaButton } from './PoistaTarinaButton';
import { MuokkaaTarinaButton } from './MuokkaaTarinaButton';


const TarinaList = (props) => {
    // console.log("MatkakohdeLista - props: ", props);
    const [virhe, setVirhe] = useState("");
    let tarinat = props.tarinat || [];
    const { token } = useAuth("");
    let navigate = useNavigate();
    const reissut = tarinat.map((m, index) => {
    const kuvatClicked = (matka, matkakohde) => {

        let idmatka = matka || "";
        let idmatkakohde = matkakohde || "";

        navigate("/travel/self/stories/images", {
            state: {
                idmatka: idmatka,
                idmatkakohde: idmatkakohde,
            }
        })
    }




      return (
        <tr key={m.teksti}>
          <td>{index}</td>
          <td>{m.pvm}</td>
          <td>{m.teksti}</td>
          <td>{m.kohdenimi}</td>
          <td><Button variant="primary" size="sm" onClick={() => kuvatClicked(m.idmatka, m.idmatkakohde)}>Kuvat</Button></td>
          <td><MuokkaaTarinaButton tarina = {m}/></td>
          <td><PoistaTarinaButton tarina = {m}/></td>
        </tr>
      );
    });
    
    return (
      <Card >
          {tarinat.length === 0 ?
              <VirheViesti1 viesti={virhe} kohde="tarinoita" /> :
              <Table striped bordered hover responsive >
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Päivämäärä</th>
                          <th>Teksti</th>
                          <th>Kohde</th>
                          <th>Kuvat</th>
                          <th>Muokkaa</th>
                          <th>Poista</th>
                      </tr>
                  </thead>
                  <tbody>
                      {reissut}
                  </tbody>
                    

              </Table>
          }
          <LisaaTarinaButton  id={props.id}/>
      </Card>
  );
  };
  
  export { TarinaList };