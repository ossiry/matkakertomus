const sql = require("../database/memberSQL");

const fetchAllMembers = async (req, res, next) => {

    console.log("Jäsenten hakeminen aloitettu ...");

    try {
        let result = await sql.haeKaikkiJasenet();

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Jäseniä ei löytynyt!" })
        } else {
            res.statusCode = 200;
            res.json({ status: "OK", msg: "Jäsenten haku onnistui!", data: result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa jäseniä!" });
    }
}

module.exports = { fetchAllMembers }