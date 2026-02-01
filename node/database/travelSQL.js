// const connection = require("../config/dbConnection");
const executeSQL = require("./executeSQL");

const haeKaikkiMatkakohteet = () => {

    let query = "SELECT * FROM matkakohde ORDER BY maa, paikkakunta, kohdenimi;";
    let params = [];

    console.log("--- SQL haeKaikkiMatkakohteet ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const haeYksiMatkakohde = (id) => {
    let query = "SELECT * FROM matkakohde WHERE idmatkakohde = ?;";
    let params = [parseInt(id)];

    console.log("--- SQL haeYksiMatkakohde ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const haeValitutMatkakohteet = (taulu, ehto) => {
    let query = "SELECT * FROM matkakohde WHERE ";
    let params = [ehto];    

    query += taulu + " LIKE '%" + ehto + "%' ORDER BY kohdenimi";

    console.log("--- SQL haeValitutMatkakohteet ---\nQUERY: ", query + "\nPARAMS: ", params);

    return executeSQL(query, params);
}

const haeSuositutMatkakohteet = () => {

    let query = "SELECT * FROM matkakohde limit 6;"; // TODO: (tällä erää vain ensimmäiset hakee vain tietokanna ensimmäiset 6 matkakohdetta)
    let params = [];

    console.log("--- SQL haeKaikkiMatkakohteet ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const lisaaMatkakohde = (kohdenimi, maa, paikkakunta, kuvausteksti, kuva) => {

    let query = "INSERT INTO matkakohde (kohdenimi, maa, paikkakunta, kuvausteksti, kuva) VALUES (?, ?, ?, ?, ?);";
    let params = [kohdenimi, maa, paikkakunta, kuvausteksti, kuva];

    console.log("--- SQL lisaaMatkakohde ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const muokkaaMatkakohde = (kohdenimi, maa, paikkakunta, kuvausteksti, idmatkakohde, kuva) => {
    let query = "UPDATE matkakohde SET kohdenimi = ?, maa = ?, paikkakunta = ?, kuvausteksti = ?, kuva = ? WHERE idmatkakohde = ?;";
    let params = [kohdenimi, maa, paikkakunta, kuvausteksti, kuva, idmatkakohde];

    console.log("--- SQL muokkaaMatkakohde---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const poistaMatkakohde = (idmatkakohde) => {
    let query = "DELETE FROM matkakohde WHERE idmatkakohde = ?;";
    let params = [idmatkakohde];

    console.log("--- SQL poistaMatkakohde ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

module.exports = { haeKaikkiMatkakohteet, haeYksiMatkakohde, haeValitutMatkakohteet, haeSuositutMatkakohteet, lisaaMatkakohde, muokkaaMatkakohde, poistaMatkakohde }