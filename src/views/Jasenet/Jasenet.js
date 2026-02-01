import { useState, useEffect } from "react";
import { JasenetList, JasenetList2 } from './JasenetList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { JasenetHeader } from "./JasenetHeader";

export default function Jasenet() {
  const [jasenet, setJasenet] = useState([]);
  const [jasenet2, setJasenet2] = useState([]);
  const [virheviesti, setVirheviesti] = useState('Ladataan tietoja ...');

  const[keyword, setKeyword] = useState("");

  const Suodatin = (e) => {
    
    setKeyword(e);

    if(keyword.length > 1){
      let etsi = () => {
        return jasenet.filter(o => 
          Object.entries(o).some(entry => 
            String(entry[1]).toLowerCase().includes(String(keyword).toLowerCase())));
      };
  
      if(jasenet.length > 0){
        setJasenet(etsi);
      }
    }else{
      setJasenet(jasenet2);
    }
  
  };
  
  useEffect(() => {
    const haeJasenet = async () => {
      const response = await fetch("http://localhost:3002/members", {
        method: "GET",
      });

      let data = await response.json();
      console.log("GET (jäsenten haku): ", data);

      if (
        response.status.toString().charAt(0) === 2 ||
        response.statusText === "OK"
      ) {
        setJasenet(data.data);
        setJasenet2(data.data);
      } else {
        console.log("Virhe jäseniä haettaessa", "msg: ", data.msg);
        setVirheviesti(data.msg);
      }
    };
    haeJasenet();
  }, []);

  return (
    <Container style={{padding: "0 2rem 2rem 2rem"}} className="outer">
      
      <Row >
        <Col style={{ padding: "1.5rem 1.5rem 1.5rem 1.5rem" }}>
          
        <input className="form-control me-2 " type="hae" placeholder="Hae" aria-label="Hae" onChange={(e) => Suodatin(e.target.value)} />
         
        </Col>
      </Row>
      
      <Row style={{ justifyContent: "center" }}>
        <Col sm={6} style={{ padding: "0 0.5rem 0 1.5rem" }}>
          <JasenetList jasenet={jasenet} virhe={virheviesti} />
        </Col>
        <Col sm={6} style={{ padding: "0 1.5rem 0.5rem 0" }}>
          <JasenetList2 jasenet={jasenet} virhe={virheviesti} />
        </Col>
      </Row>
    </Container>
  );
}