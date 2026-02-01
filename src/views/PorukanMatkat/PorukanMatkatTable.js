import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const PorukanMatkatTable = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    let matkat = props.matkat || [];

    const kuvatClicked = (matka, matkakohde) => {

        let idmatka = matka || "";
        let idmatkakohde = matkakohde || "";

        navigate("/travel/all/images", {
            state: {
                idmatka: idmatka,
                idmatkakohde: idmatkakohde,
            }
        })
    }

    const kaikkiMatkat = matkat.map((m, index) => {
        return (
            <tr key={index}>
                <td>{m.idmatka}</td>
                <td>{m.nimimerkki}</td>
                <td>{m.alkupvm}</td>
                <td>{m.loppupvm}</td>
                <td>{m.kohdenimi}</td>
                <td>{m.teksti}</td>
                <td>{m.pvm}</td>
                <td><Button variant="secondary" onClick={() => kuvatClicked(m.idmatka, m.idmatkakohde)}>Kuvat</Button></td>
            </tr>
        );
    });

return (
    <Table>
        <thead>
            <tr>
                <td>Matka-id</td>
                <td>Nimimerkki</td>
                <td>Alkupvm</td>
                <td>Loppupvm</td>
                <td>Matkakohde</td>
                <td>Tarina</td>
                <td>Päivämäärä</td>
                <td>Kuvat</td>
            </tr>
        </thead>
        <tbody>
            {kaikkiMatkat}
        </tbody>
    </Table>
);
}

export { PorukanMatkatTable }