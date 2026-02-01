import Table from 'react-bootstrap/Table';

const OmatTiedotTable = (props) => {

    const { tiedot } = props;
    
    return (
        <Table striped bordered hover responsive  >
            <tbody>
                <tr>
                    <td>Nimimerkki</td>
                    <td>
                        {tiedot.nimimerkki}
                    </td>
                </tr>
                <tr>
                    <td>Etunimi</td>
                    <td>{tiedot.etunimi}</td>
                </tr>
                <tr>
                    <td>Sukunimi</td>
                    <td>{tiedot.sukunimi}</td>
                </tr>
                <tr>
                    <td>Paikkakunta</td>
                    <td>{tiedot.paikkakunta}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{tiedot.email}</td>
                </tr>
            </tbody>
        </Table>
    );
}

export { OmatTiedotTable }