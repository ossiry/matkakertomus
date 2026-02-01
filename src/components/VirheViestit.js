import Spinner from 'react-bootstrap/Spinner';

const VirheViesti1 = (props) => {

    let { viesti, kohde } = props;
    console.log("VIESTI: ", viesti);

    if (!viesti) {
        return (
            <div className="d-flex align-items-center" style={{ height: "20rem", justifyContent: "center", overflowWrap: "break-word" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Ladataan...</span>
                </Spinner> &nbsp; &nbsp; <h4>Ladataan {kohde}...</h4>
            </div>
        )
    } else {
        return (
            <div className="d-flex align-items-center" style={{ height: "20rem", justifyContent: "center" }}>
                <h4>{viesti}</h4>
            </div>
        )
    }
}

export { VirheViesti1 }
