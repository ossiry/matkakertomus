import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { VirheViesti1 } from '../../components/VirheViestit';
import { useMatkakohde } from '../../resources/context/MatkakohdeContext';

const MatkakohdeTable = (props) => {

    const { matkakohdeId, setMatkakohdeId } = useMatkakohde("-1");
    const [matkakohteet, setMatkakohteet] = useState([]);
    const [virhe, setVirhe] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const haeMatkaKohteet = async (url) => {
            // console.log("URL:", url)
            const response = await fetch(url, {
                method: "GET",
            });

            let data = await response.json();
            // console.log("GET (matkakohteiden haku): ", data);
            if (
                response.status.toString().charAt(0) === 2 ||
                response.statusText === "OK"
            ) {
                setMatkakohteet(data.data);
                setMatkakohdeId(-1);
            } else {
                console.log("Virhe matkakohteita haettaessa", "msg: ", data.msg);
                data.msg ? setVirhe(data.msg) : setVirhe("Virhe matkakohteita haettaessa!");
            }
        };

        let url = "http://localhost:3002/destination";
        let option = props.hakuValinnat.option;
        let input = props.hakuValinnat.input;

        if (matkakohdeId > -1) {
            url += "/one?id=" + matkakohdeId;
        } else if (option && option !== "-1") {
            url += '/query?table=' + option + '&filter=' + input;
        }
        haeMatkaKohteet(url);
    }, [props.hakuValinnat]);

    const kohteet = matkakohteet.map((m, index) => {
        return (
            <tr key={m.idmatkakohde}>
                <td>{index +1}</td>
                <td>{m.maa}</td>
                <td>{m.paikkakunta}</td>
                <td><Button variant="link" size="sm" onClick={(e) => props.onMatkakohdeClicked(m)}>{m.kohdenimi}</Button></td>
                {/* <td><Button variant="outline-dark" size="sm" onClick={(e) => props.onMatkakohdeClicked(m)}>{m.kohdenimi}</Button></td> */}
                {/* <td><Button variant="warning" size="sm" onClick={(e) => props.onMatkakohdeClicked(m)}>{m.kohdenimi}</Button></td> */}
                {/* <td><Button variant="info"  size="sm" onClick={(e) => props.onMatkakohdeClicked(m)}>{m.kohdenimi}</Button></td> */}
            </tr>
        );
    });

    return (
        <Card>
            {matkakohteet.length === 0 ?
                <VirheViesti1 viesti={virhe} kohde="matkakohteita" /> :
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Maa</th>
                            <th>Kaupunki</th>
                            <th>Matkakohde</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kohteet}
                    </tbody>
                </Table>
            }
        </Card>
    );
}

export { MatkakohdeTable }