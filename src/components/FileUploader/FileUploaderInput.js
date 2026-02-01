import '../../stylesheets/fileuploader.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function FileUploaderInput(props) {

    const [fileData, setFileData] = useState(null);

    let method = '';
    let url = "http://localhost:3002/";

    const onInputChange = (e) => {

        console.log("FILESIZE: ", e.target.files[0].size, "FILETYPE: ", e.target.files[0].type);
        let data = new FormData();
        data.append('file', e.target.files[0],);
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
                console.log("Kuvan tallentaminen palvelimelle onnistui!");
                toast.success("Kuvan tallentaminen onnistui!")
                let fileName = data.data.filename;
                let fileFolder = data.data.destination;
                fileFolder = fileFolder.substring(9);
                let filePath = './' + fileFolder + '/' + fileName;
                props.setKuva(filePath);
            } else {
                console.log("Virhe kuvan tallentamisessa palvelimelle!");
                toast.error("Virhe kuvan tallentamisessa!");
                props.setKuvaSaved(!props.upload); // == false
            }
        };

        if (fileData !== null && props.upload) {
            console.log("Aloitetaan kuvan tallentaminen palvelimelle.");
            props.url ? url = "http://localhost:3002/" + props.url || "" : url = "http://localhost:3002/destination/upload/matkakohde" // default kohde
            props.method ? method = method = props.method : method = "POST"; // default metodi
            lahetaKuva();
        } else if (props.upload) {
            props.setKuvaSaved(!props.upload); // == false
        }
    }, [props.upload]);

    return (
        // <div className="form-group files">
        <div>
            <label>Valitse kuvatiedosto:</label>
            <input
                type="file"
                onChange={(e) => onInputChange(e)}
                className="form-control"
                multiple="" />
        </div>
    );
}

export { FileUploaderInput };