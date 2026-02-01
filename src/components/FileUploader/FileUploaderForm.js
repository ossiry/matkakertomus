import '../../stylesheets/fileuploader.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../resources/context/AuthContext';
import { toast } from 'react-toastify';
import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function SingleFileUploaderForm(props) {

    const { token } = useAuth('');
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState(null);

    let method = '';
    let url = "";

    const onInputChange = (e) => {
        console.log("FILESIZE: ", e.target.files[0].size, "FILETYPE: ", e.target.files[0].type);
        setFile(e.target.files[0]);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('file', file);
        setFileData(data);
    }

    useEffect(() => {
        const lahetaKuva = async () => {
            const response = await fetch(url, {
                method: method,
                body: fileData
            });

            let data = await response.json();
            console.log("POST, (kuvan lisäys palvelimelle): ", data);
            if (
                response.status === 201 ||
                response.statusText === "Created"
            ) {
                console.log("Kuvan tallentaminen onnistui!");
                toast.success("Kuvien tallentaminen onnistui!")
                // props.onSuccess(data.data);
                let fileName = data.data.filename;
                let fileFolder = data.data.destination;
                fileFolder = fileFolder.substring(9);
                let filePath = './' + fileFolder + '/' + fileName;
                props.setPathToKuva(filePath);

            } else {
                console.log("Virhe kuvan tallentamisessa!");
                toast.error("Virhe kuvan tallentamisessa!");
                props.setPathToKuva("error");
            }
        };

        if (fileData !== null) {
            console.log("Aloitetaan kuvan tallentaminen palvelimelle.");
            props.url ? url = "http://localhost:3002/" + props.url || "" : url = "http://localhost:3002/destination/upload/matkakohde" // default kohde
            props.method ? method = method = props.method : method = "POST"; // default metodi
            lahetaKuva();
        }
    }, [fileData]);

    return (
        <Container>
            <Card style={{ padding: "1rem 1rem 1rem 1rem" }}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group files">
                        <label>Valitse kuvatiedosto:</label>
                        <input
                            type="file"
                            onChange={(e) => onInputChange(e)}
                            className="form-control"
                            multiple />
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="primary" disabled={token === null} style={{ padding: "0.5rem" }}>Lähetä</Button>
                        <Button variant="secondary" onClick={(e) => navigate(-1)}>Peruuta</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}


function MultipleFileUploaderForm(props) {

    const { token } = useAuth('');
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [fileData, setFileData] = useState(null);

    let method = '';
    let url = "";

    const onInputChange = (e) => {
        setFiles(e.target.files);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit clicked!");

        let data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }

        setFileData(data);
    }

    useEffect(() => {
        const lahetaKuva = async () => {
            const response = await fetch(url, {
                method: method,
                body: fileData
            });

            let data = await response.json();
            console.log("POST, (kuvienn lisäys palvelimelle): ", data);
            if (
                response.status === 201 ||
                response.statusText === "Created"
            ) {
                console.log("Kuvien tallentaminen palvelimelle onnistui!");
                toast.success("Kuvien tallentaminen palvelimelle onnistui!")
                props.onSuccess(data.data);

            } else {
                console.log("Virhe kuvien tallentamisessa palvelimelle!");
                toast.error("Virhe kuvan tallentamisessa palvelimelle!");
            }
        };

        if (fileData !== null) {
            console.log("Aloitetaan kuvien tallentaminen palvelimelle.");
            props.url ? url = "http://localhost:3002/" + props.url || "" : url = "http://localhost:3002/destination/upload/matkakohde" // default kohde
            props.method ? method = method = props.method : method = "POST"; // default metodi
            lahetaKuva();
        }
    }, [fileData]);

    return (
        <Container>
            <Card style={{ padding: "1rem 1rem 1rem 1rem" }}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group files">
                        <label>Valitse kuvatiedosto:</label>
                        <input
                            type="file"
                            onChange={(e) => onInputChange(e)}
                            className="form-control"
                            multiple />
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="sm" disabled={token === null} style={{ padding: "0.5rem" }}>Lähetä</Button>
                        <Button variant="secondary" onClick={(e) => navigate(-1)}>Peruuta</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}

export { SingleFileUploaderForm, MultipleFileUploaderForm }