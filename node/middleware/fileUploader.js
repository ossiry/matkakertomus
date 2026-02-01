const express = require('express');
const multer = require('multer');
// const app = require('../server');
// const fs = require('fs-extra');

const app = express();

const fileUploader = async (req, res, next) => {

    console.log('uploading destination-file to storage started ...');
    // console.log('PARAMS: ', req.params);

    let fileSource = req.params.source;
    let folderPath = "./../src/resources/images/"; // polku alkaen node kansiosta

    if (fileSource === "matkakohde") {
        folderPath += "matkakohteet"
    } else if (fileSource === "kayttaja") {
        folderPath += "profiilikuvat"
    } else if (fileSource === "tarina") {
        folderPath += "matkakertomukset"
    }
     else {
        return res.status(500).send({
            msg: "Ongelma kuvan tallentamisessa!"
        });
    }
    // folderPath += `/${fileType}`; // lisää tiedostotyypit omiin kansioihin
    // console.log("folder path: ", folderPath); // lopullinen polku tallennettavaan kansioon

    // app.use(express.static(folderPath)); // liittyy kuvien preview:iin

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            // fs.mkdirsSync(folderPath); // luo uuden kansion, jos sitä ei ole olemassa
            callback(null, folderPath)
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname)
        }
    });

    const upload = multer({ storage }).single('file');

    upload(req, res, next, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        // return res.status(200).send(req.file) // palautus route-tiedostossa
        next();
    })
}

const multipleFileUploader = async (req, res, next) => {

    console.log('uploading destination-files to storage started ...');
    // console.log('PARAMS: ', req.params);

    let fileSource = req.params.source;
    let folderPath = "./../src/resources/images/"; // polku alkaen node kansiosta

    if (fileSource === "matkakohde") {
        folderPath += "matkakohteet"
    } else if (fileSource === "kayttaja") {
        folderPath += "profiilikuvat"
    } else {
        return res.status(500).send({
            msg: "Ongelma kuvien tallentamisessa."
        })
    }

    // folderPath += `/${fileType}`; // lisää tiedostotyypit omiin kansioihin
    // console.log("folder path: ", folderPath);

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            // fs.mkdirsSync(folderPath); // tekee uuden kansion, jos sitä ei ole olemassa
            callback(null, folderPath)
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname)
        }
    });

    const upload = multer({ storage }).array('file');

    upload(req, res, next, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        // return res.status(200).send(req.file) // palautus route-tiedostossa
        next();
    })
}

module.exports = { fileUploader, multipleFileUploader }