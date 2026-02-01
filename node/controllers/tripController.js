const sql = require("../database/tripSQL");

const fetchOwnTrips = async (req, res, next) => {

    console.log("Omien matkojen hakeminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { id } = req.params;

    try {
        let result = await sql.haeOmatMatkat(id);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Omia matkoja ei löytynyt!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Omien matkojen haku onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa omia matkoja!" });
    }
}

const fetchTripStories = async (req, res, next) => {

    console.log("Matkan tarinoiden haku aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { id } = req.params;

    try {
        let result = await sql.haeMatkanTarinat(id);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tarinoita!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkan tarinoiden haku onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa tarinoita" });
    }
}

const addTripStory = async (req, res, next) => {

    console.log("Tarinan lisääminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { idmatkakohde, pvm, teksti, idmatka, kuva } = req.body;

    try {
        let result = await sql.lisaaMatkaTarina(idmatkakohde, pvm, teksti, idmatka);

        if (result.affectedRows === 0) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tarinoita!" })
        } else {
            let result2 = await sql.lisaaKuva(idmatkakohde, kuva, idmatka);
            if(result2.affectedRows > 0){
                res.statusCode = 200;
                res.json({ status: "OK", msg: "Tarinan lisääminen onnistui!", data: result });
            }
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe lisättäessä tarinoita" });
    }
}

const modOwnTrip = async (req, res, next) => {

    console.log("Tarinan lisääminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { alkupvm, loppupvm, yksityinen, idmatka } = req.body;

    try {
        let result = await sql.muokkaaMatka(alkupvm, loppupvm, yksityinen, idmatka);

        if (result.affectedRows = 0) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tarinoita!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkan muokkaaminen onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe muokattaessa matkaa" });
    }
}

const delStory = async (req, res) => {

    console.log("Tarinan poistaminen aloitettu ...");

    let { idmatkakohde, idmatka } = req.body;

    try {
        let result = await sql.poistaTarina(idmatkakohde, idmatka);

        if (result.affectedRows === 0) {
            res.status(400).send();
        } else {
            res.status(204).send();
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.status(400).send({ status: "NOT OK", msg: "Tapahtui virhe tarinaa poistettaessa!" });
    }
}

const fetchAllTrips = async (req, res) => {

    console.log("Kaikkien matkojen haku aloitettu ...");

    let { nimimerkki, matkaid, alkupvm, loppupvm, tarina, pvm, matkakohde, matkakohdeid } = req.body;

    try {
        let result = await sql.haeKaikkiMatkat(nimimerkki, matkaid, alkupvm, loppupvm, tarina, pvm, matkakohde, matkakohdeid);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Matkojen haku epäonnistui!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkojen haku onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa matkoja!" });
    }
}

const fetchTripImages = async (req, res) => {

    console.log("Matkan kuvien haku aloitettu ...");

    let { idmatka, idmatkakohde } = req.query;

    try {
        let result = await sql.haeMatkanKuvat(idmatka, idmatkakohde);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Kuvia ei löytynyt!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkan kuvien haku onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa matkan kuvia!" });
    }
}


const delOwnTrip = async (req, res) => {

    console.log("Matkan poisto aloitettu ...");

    let { idmatka } = req.body;

    try {
        let result = await sql.poistaMatka(idmatka);

        if (result.affectedRows === 0) {
            res.status(400).send();
        } else {
            res.status(200).send();
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.status(400).send();
    }
}


const addTrip = async (req, res, next) => {

    console.log("Matkan lisääminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { alkupvm, loppupvm, idmatkaaja, yksityinen } = req.body;

    try {
        let result = await sql.lisaaMatka(alkupvm, loppupvm, idmatkaaja, yksityinen);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Probleema!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkan lisääminen onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe lisättäessä matkaa" });
    }
}

const updateStory = async (req, res, next) => {

    console.log("Tarinan muokkaaminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { idmatkakohde, pvm, teksti, idmatka, kuva } = req.body;

    try {
        let result = await sql.muokkaaTarina(idmatkakohde, pvm, teksti, idmatka);

        if (result.affectedRows === 0) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Tarinoita!" })
        } else {
            let result2 = await sql.lisaaKuva(idmatkakohde, kuva, idmatka);
            if(result2.affectedRows > 0){
                res.statusCode = 200;
                res.json({ status: "OK", msg: "Tarinan muokkaaminen onnistui!", data: result });
            }
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe lisättäessä tarinoita" });
    }
}
const addPhoto = async (req, res, next) => {

    console.log("Tarinan kuvan lisääminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { idmatkakohde, pvm, teksti, idmatka, kuva } = req.body;

    try {
        let result = await sql.lisaaKuva(idmatkakohde, pvm, teksti, idmatka, kuva);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Probleema!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkan lisääminen onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe lisättäessä matkaa" });
    }
}

const delPhoto = async (req, res, next) => {

    console.log("Tarinan kuvan poistaminen aloitettu ...");
    // console.log("PARAMS: ", req.params);

    let { idmatkakohde,idmatka } = req.body;

    try {
        let result = await sql.poistaKuva(idmatkakohde,idmatka);

        next();

    } catch (err) {
        console.log("Error in server! ", err);
        res.status(400).send();
    }
}


module.exports = { fetchOwnTrips, fetchTripStories, addTripStory, modOwnTrip, delStory, fetchAllTrips, fetchTripImages, delOwnTrip, addTrip, updateStory, addPhoto, delPhoto }
