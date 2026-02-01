// const uuid = require('uuid');
const executeSQL = require("./executeSQL");

const tarkistaKayttaja = (nimimerkki, email) => {

    let query = "SELECT nimimerkki, email FROM matkaaja WHERE nimimerkki = ? OR email = ?";
    let params = [];

    if (nimimerkki !== null) params.push(nimimerkki);
    if (email !== null) params.push(email);

    console.log("--- SQL tarkistaKayttaja ---\nQUERY: ", query + "\nPARAMS: ", params);

    if (params.length > 0) {
        return executeSQL(query, params);
    }
}

const lisaaKayttaja = (nimimerkki, etunimi, sukunimi, salasana, email) => {

    let query = "INSERT INTO matkaaja (etunimi, sukunimi, nimimerkki, email, password) VALUES (?, ?, ?, ?, ?) ";
    let params = [etunimi, sukunimi, nimimerkki, email.toLowerCase(), salasana];

    console.log("--- SQL lisaaKayttaja ---\nQUERY: ", query + "\nPARAMS: ", params);

    return executeSQL(query, params);
}

const haeKayttaja = (email) => {

    let query = "SELECT * FROM matkaaja WHERE email = ?";
    let params = [email];

    console.log("--- SQL haeKayttaja ---\nQUERY: ", query + "\nPARAMS: ", params);

    return executeSQL(query, params);
}

const haeKayttajaTiedot = (email) => {

    let query = "SELECT etunimi, sukunimi, nimimerkki, paikkakunta, esittely, kuva, email " +
        "FROM matkaaja WHERE email = ?";
    let params = [email];

    console.log("--- SQL haeKayttajaTiedot ---\nQUERY: ", query + "\nPARAMS: ", params);

    return executeSQL(query, params);
}

const lisaaProfiiliKuva = (kuva, id) => {

    let query = "UPDATE matkaaja SET kuva = ? WHERE idmatkaaja = ?";
    let params = [kuva, id];

    console.log("--- SQL lisaaProfiiliKuva ---\nQUERY: ", query + "\nPARAMS: ", params);

    return executeSQL(query, params);
}

const paivitaProfiilia = (id, email, nimimerkki, etunimi, sukunimi, paikkakunta, esittely) => {

    let query = "UPDATE matkaaja set nimimerkki = ?, etunimi = ?, sukunimi = ?, paikkakunta = ?, esittely = ? WHERE idmatkaaja = ?;";
    let params = [nimimerkki, etunimi, sukunimi, paikkakunta, esittely, parseInt(id)];

    console.log("--- SQL paivitaProfiilia ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

module.exports = { tarkistaKayttaja, lisaaKayttaja, haeKayttaja, haeKayttajaTiedot, lisaaProfiiliKuva, paivitaProfiilia };