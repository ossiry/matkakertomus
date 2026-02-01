const executeSQL = require("./executeSQL");

const haeKaikkiJasenet = () => {

    let query = "SELECT idmatkaaja, etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva FROM matkaaja";
    let params = [];

    console.log("--- SQL haeKaikkiJäsenet ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

module.exports = { haeKaikkiJasenet }