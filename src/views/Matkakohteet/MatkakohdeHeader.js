import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { LisaaKohdeButton } from './LisaaKohdeButton';

const MatkakohdeHeader = (props) => {

    const [selectValinta, setSelectValinta] = useState("Valitse...");
    const [input, setInput] = useState("");
    const [ilmoitus, setIlmoitus] = useState(false);

    let vvColor = "red";

    const selectChanged = (e) => {
        if (e.target.value !== "Valitse...") {
            setIlmoitus(false);
            setSelectValinta(e.target.value);
        }
    }

    const haeMatkakohteitaClicked = (e) => {
        e.preventDefault();

        if (selectValinta === "Valitse...") {
            setIlmoitus(true);
        } else if (selectValinta === "kaikki") {
            props.setHakuValinnat({ option: "", input: input });
            setIlmoitus(false);
            setInput("");
        } else {
            props.setHakuValinnat({ option: selectValinta, input: input });
            setIlmoitus(false);
        }
    }

    return (
        <Card style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem" }}>
            <Row style={{ paddingBottom: "0.5rem" }}>
                <div className="d-grid gap-2">
                    <LisaaKohdeButton />
                </div>
            </Row>
            <hr />
            <Row style={{ paddingTop: "0.5rem" }}>
                <Form.Group as={Col} className="mb-3" controlId="formGroupValinnat">
                    <Form.Select defaultValue="Valitse..." onChange={(e) => selectChanged(e)}>
                        <option>Valitse hakuehdot</option>
                        <option value="kaikki">Kaikki</option>
                        <option value="kohdenimi">Matkakohde</option>
                        <option value="maa">Maa</option>
                        <option value="paikkakunta">Kaupunki</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formGroupInput">
                    <Form.Control placeholder="Syötä haettava merkkijono" value={input} disabled={selectValinta === "kaikki"}
                        onChange={(e) => setInput(e.target.value)} />
                </Form.Group>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit" onClick={(e) => haeMatkakohteitaClicked(e)}>
                            Hae matkakohteita
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row style={{ textAlign: "flex-end" }}>
                <Col md={{ span: 3, offset: 9 }}>{ilmoitus ? <p style={{ fontWeight: "bold", color: vvColor }}>Valitse hakuehto!</p> : null}</Col>

            </Row>
        </Card>
    );
}

export { MatkakohdeHeader }