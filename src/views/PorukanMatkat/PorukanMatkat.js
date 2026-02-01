import { useState, useEffect } from 'react';
import { PorukanMatkatTable } from './PorukanMatkatTable';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function PorukanMatkat() {

    const [matkat, setMatkat] = useState(null);
    
    const [matkat2, setMatkat2] = useState(null);

    const [testaa, setTestaa] = useState(false);

    const hakuClicked = (e) => {
        setTestaa(!testaa);
    }

    const[keyword, setKeyword] = useState("");

    const Suodatin = (e) => {
        
        setKeyword(e);

        if(keyword.length > 1){
        let etsi = () => {
            return matkat.filter(o => 
            Object.entries(o).some(entry => 
                String(entry[1]).toLowerCase().includes(String(keyword).toLowerCase())));
        };
    
        if(matkat.length > 0){
            setMatkat(etsi);
        }
        }else{
            setMatkat(matkat2);
        }
    
    };

    useEffect(() => {
        const haeKaikkiMatkat = async () => {
            const response = await fetch("http://localhost:3002/travel/all", {
                method: "GET",
            });

            let data = await response.json();
            console.log("GET (kaikkien matkojen haku): ", data);

            if (
                response.status.toString().charAt(0) === 2 ||
                response.statusText === "OK"
            ) {
                setMatkat(data.data);
                setMatkat2(data.data);
            } else {
                console.log("Virhe matkoja haettaessa", "msg: ", data.msg);
                // setVirheviesti(data.msg);
            }
        };
        haeKaikkiMatkat();
    }, [testaa]);

    return (
        
        
        <Container style={{ backgroundColor: "white", marginTop: "50px" }} className="outer">
            <input className="form-control me-2 " type="hae" placeholder="Hae" aria-label="Hae" onChange={(e) => Suodatin(e.target.value)} />
            <Row>
                <PorukanMatkatTable matkat={matkat} />
            </Row>
        </Container>
    );
}