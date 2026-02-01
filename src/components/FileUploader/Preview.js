import { ToastContainer } from 'react-toastify';
import { SingleFileUploaderForm, MultipleFileUploaderForm } from './FileUploaderForm'; // kuvan tallentamisen testaamiseksi
import { useState } from 'react';

const Preview = (files) => {

    if (!files.length) {
        return null
    }

    return files.map((file) =>
        <img style={{ maxWidth: "200px" }} src={`../../resources/images/matkakohteet/${file.filename}`} alt={file.originalname} />);
}

const ShowPreview = () => {

    const [files, setFiles] = useState([]);

    const onSuccess = (savedFiles) => {
        setFiles(savedFiles);
        console.log("savedFiles: ", savedFiles);
        console.log("savedFilesname: ", savedFiles.filename);
        console.log("path: ", "../../resources/images/matkakohteet/" + savedFiles.filename);
    }
    
    return (
        <div>
            <SingleFileUploaderForm onSuccess={onSuccess} />
            <div>
                <Preview files={files} />
            </div>
            <ToastContainer />
        </div>
    );
}

export { Preview, ShowPreview }