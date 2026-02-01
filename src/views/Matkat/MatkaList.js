import { MuokkaaMatkaButton } from "./MuokkaaMatkaButton";
import { PoistaMatkaButton } from "./PoistaMatkaButton";
import { MatkanTarinatButton } from "./MatkanTarinatButton";
import { LisaaMatkaButton } from "./LisaaMatkaButton";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { VirheViesti1 } from '../../components/VirheViestit';



const MatkaList = (props) => {
    // console.log("MatkakohdeLista - props: ", props);
    const [virhe, setVirhe] = useState("");
    let kohteet = props.kohteet || [];
    let refresh = props.refresh;
    const reissut = kohteet.map((m, index) => {
      // if (m.yksityinen==0){
      //   m.yksityinen = "Yksityinen";
      // }
      // else{
      //   m.yksityinen = "Julkinen"
      // }
      return (
        <tr key={m.idmatka}>
          <td>{index}</td>
          <td>{m.alkupvm}</td>
          <td>{m.loppupvm}</td>
          <td>{m.yksityinen}</td>
          <td><MatkanTarinatButton matka={m} /></td>
          <td><MuokkaaMatkaButton matka={m} /></td>
          <td><PoistaMatkaButton matka={m} refresh={refresh} /></td>
        </tr>
      );
    });
    
    return (
      <Card >
          {reissut.length === 0 ?
              <VirheViesti1 viesti={virhe} kohde="matkakohteita" /> :
              <Table striped bordered hover responsive >
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Alkupäivämäärä</th>
                          <th>Loppupäivämäärä</th>
                          <th>Yksityinen</th>
                          <th>Tarinat</th>
                          <th>Muokkaa</th>
                          <th>Poista</th>
                      </tr>
                  </thead>
                  <tbody>
                      {reissut}
                  </tbody>
              </Table>
          }
          <LisaaMatkaButton />
      </Card>
  );
  };
  
  export { MatkaList };