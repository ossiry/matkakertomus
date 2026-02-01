// const path = require('path');
const sql = require('../database/uploadSQL');

// tälle metodille ei liene käyttöä, mutta jätän varalle muistiin
const updateDestinationPicture = async (req, res) => {

    console.log("updating picture to destination started");
    // console.log("PARAMS ", req.params);

    let fileName = req.file.filename;
    let fileFolder = req.file.destination;
    fileFolder = fileFolder.substring(9);
    let filePath = './' + fileFolder + '/' + fileName; // muodostetaan projektin rootista polku kansioon, jonne kuvat/tiedostot tallennetaan
    console.log("path to picture/file: ", filePath);

    // KOKO TIEDOSTOPOLKU TIETOKONEELLA
    // let currentFolder = path.basename(__dirname);
    // let currentFile = path.basename(__filename);
    // let filePath = __dirname.substring(0, __dirname.length - (currentFolder.length + 1));
    // fileFolder = fileFolder.substring(1);
    // filePath = filePath.split("\\").join("/") + fileFolder + fileName;
    // console.log(path.join(__dirname +'./../../src'));

    try {
        let result = await sql.paivitaKuvanPolku(filePath, req.params.id);
        res.statusCode = 201;
        res.json({
            status: 'Created', data: req.file, data: result
        });
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe lisättäessä!" });
    }
}

module.exports = { updateDestinationPicture }