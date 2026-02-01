const sql = require("../database/travelSQL");

const fetchAllDestinations = async (req, res, next) => {

    console.log("Matkakohteiden hakeminen aloitettu ...");

    try {
        let result = await sql.haeKaikkiMatkakohteet();

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Matkakohteita ei löytynyt!" });
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkakohteiden haku onnistui!", data: result });
            // toimii myös lyhyemmin: return res.status(200).send({status: "OK, msg: ""..."", data: result});
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa matkakohteita!" });
    }
}

const fetchOneDestination = async (req, res, next) => {

    console.log("Matkakohteen hakeminen aloitettu ...");

    try {
        let result = await sql.haeYksiMatkakohde(req.query.id);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Matkakohdetta ei löytynyt!" });
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkakohteen haku onnistui!", data: result });
            // toimii myös lyhyemmin: return res.status(200).send({status: "OK, msg: ""..."", data: result});
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa matkakohdetta!" });
    }
}

const fetchDestinationsByParams = async (req, res, next) => {

    console.log("Matkakohteiden hakeminen aloitettu ...");

    try {
        let result = await sql.haeValitutMatkakohteet(req.query.table, req.query.filter);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Matkakohteita ei löytynyt!" });
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkakohteiden haku onnistui!", data: result });
            // toimii myös lyhyemmin: return res.status(200).send({status: "OK, msg: ""..."", data: result});
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa matkakohteita!" });
    }
}

const fetchPopularDestinations = async (req, res) => {

    console.log("Suosittujen matkakohteiden hakeminen aloitettu ...");

    try {
        let result = await sql.haeSuositutMatkakohteet();

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Matkakohteita ei löytynyt!" });
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Matkakohteiden haku onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa matkakohteita!" });
    }
}

const addDestination = async (req, res) => {

    console.log("Matkakohteen lisääminen aloitettu ...");

    let { kohdenimi, maa, paikkakunta, kuvausteksti, kuva } = req.body;

    try {
        let result = await sql.lisaaMatkakohde(kohdenimi, maa, paikkakunta, kuvausteksti, kuva);

        if (result.affectedRows === 0) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Matkakohteen lisääminen epäonnistui!" });
        } else {
            res.statusCode = 201;
            res.json({ status: "OK", msg: "Matkakohteen lisääminen onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe matkakohteen lisäämisessä!" });
    }
}

const modDestination = async (req, res) => {

    console.log("Matkakohteen päivittäminen aloitettu ...");

    let { kohdenimi, maa, paikkakunta, kuvausteksti, idmatkakohde, kuva } = req.body;

    try {
        let result = await sql.muokkaaMatkakohde(kohdenimi, maa, paikkakunta, kuvausteksti, idmatkakohde, kuva);

        if (result.affectedRows === 0) {
            res.status(400).send();
        } else {
            res.status(204).send();
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.status(400).send();
    }
}

const delDestination = async (req, res) => {

    console.log("Matkakohteen poistaminen aloitettu ...");

    let { idmatkakohde } = req.body;

    try {
        let result = await sql.poistaMatkakohde(idmatkakohde);

        if (result.affectedRows === 0) {
            res.status(400).send();
        } else {
            res.status(204).send();
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.status(400).send({ status: "NOT OK", msg: "Tapahtui virhe matkakohdetta poistettaessa!" });
    }
}

module.exports = { fetchAllDestinations, fetchOneDestination, fetchDestinationsByParams, fetchPopularDestinations, addDestination, modDestination, delDestination }