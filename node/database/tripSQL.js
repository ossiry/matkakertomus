// const connection = require("../config/dbConnection");
const executeSQL = require("./executeSQL");

const haeOmatMatkat = (id) => {

    //let query = "SELECT matka.alkupvm,matka.loppupvm,tarina.teksti, kuva.kuva,matkakohde.kohdenimi FROM tarina JOIN matka ON tarina.idmatka = matka.idmatka JOIN kuva on kuva.idmatka = tarina.idmatka JOIN matkakohde ON matkakohde.idmatkakohde = tarina.idmatkakohde WHERE matka.idmatkaaja = ?";
    let query = "SELECT * FROM matka WHERE idmatkaaja=?"
    let params = [id];

    console.log("--- SQL haeOmatMatkat ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const haeMatkanTarinat = (id) => {

    let query = "SELECT DISTINCT tarina.idmatka,tarina.idmatkakohde,tarina.pvm,tarina.teksti,matkakohde.kohdenimi FROM tarina JOIN matka ON tarina.idmatka = matka.idmatka JOIN matkakohde ON matkakohde.idmatkakohde = tarina.idmatkakohde WHERE tarina.idmatka = ?";
    let params = [id];

    console.log("--- SQL haeMatkanTarinat ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const lisaaMatkaTarina = (idmatkakohde, pvm, teksti, idmatka) => {

    let query = "INSERT INTO tarina(idmatkakohde,pvm,teksti,idmatka) VALUES(?,?,?,?)";
    let params = [idmatkakohde, pvm, teksti, idmatka];

    console.log("--- SQL lisaaMatkaTarina ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}
const muokkaaMatka = (alkupvm, loppupvm, yksityinen, idmatka) => {

    let query = "UPDATE matka SET alkupvm = ?, loppupvm = ?, yksityinen = ? WHERE idmatka = ?";
    let params = [alkupvm, loppupvm, yksityinen, idmatka];

    console.log("--- SQL muokkaaMatka ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const poistaTarina = (idmatkakohde, idmatka) => {

    let query = "DELETE FROM tarina WHERE(idmatkakohde = ? AND idmatka = ?)";
    let params = [idmatkakohde, idmatka];

    console.log("--- SQL poistaTarina ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const haeKaikkiMatkat = (nimimerkki, matkaid, alkupvm, loppupvm, tarina, pvm, matkakohde, matkakohdeid) => {

    let query = "SELECT mja.nimimerkki, mat.idmatka, mat.alkupvm, mat.loppupvm, mat.yksityinen, tra.pvm, tra.teksti, koh.kohdenimi, koh.idmatkakohde"
        + " FROM matkaaja AS mja"
        + " INNER JOIN matka AS mat ON mja.idmatkaaja = mat.idmatkaaja AND mat.yksityinen != 1"
        + " LEFT JOIN tarina AS tra ON mat.idmatka = tra.idmatka"
        + " LEFT JOIN matkakohde AS koh ON tra.idmatkakohde = koh.idmatkakohde"
        + " ORDER BY mat.alkupvm DESC;"
    let params = [nimimerkki, matkaid, alkupvm, loppupvm, tarina, pvm, matkakohde, matkakohdeid];

    console.log("--- SQL haeKaikkiMatkat ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const haeMatkanKuvat = (idmatka, idmatkakohde) => {

    let query = "SELECT kuva FROM kuva WHERE (idmatka = ? AND idmatkakohde = ?);"
    let params = [idmatka, idmatkakohde];

    console.log("--- SQL haeMatkanKuvat ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const poistaMatka = ( idmatka) => {

    let query = "DELETE FROM matka WHERE idmatka = ?";
    let params = [idmatka];

    console.log("--- SQL poistaMatka ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const lisaaMatka = ( alkupvm,loppupvm,idmatkaaja,yksityinen) => {

    let query = "INSERT INTO matka(idmatkaaja,alkupvm,loppupvm,yksityinen) VALUES(?,?,?,?)";
    let params = [idmatkaaja,alkupvm,loppupvm,yksityinen];

    console.log("--- SQL lisaaMatka ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}
const muokkaaTarina = (idmatkakohde,pvm,teksti,idmatka) => {

    let query = "UPDATE tarina SET  pvm = ?, teksti = ? WHERE (idmatka = ? AND idmatkakohde = ?)";
    let params = [pvm,teksti,idmatka,idmatkakohde];

    console.log("--- SQL muokkaaTarina ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const lisaaKuva = (idmatkakohde, kuva, idmatka) => {

    let query = "INSERT INTO kuva(kuva,idmatkakohde,idmatka) VALUES(?,?,?)";
    let params = [kuva, idmatkakohde, idmatka];

    console.log("--- SQL lisaaKuva ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

const poistaKuva = (idmatkakohde,idmatka) => {

    let query = "DELETE FROM kuva WHERE(idmatkakohde  = ? AND idmatka = ?)";
    let params = [idmatkakohde,idmatka];

    console.log("--- SQL poistaKuva ---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}


module.exports = { haeOmatMatkat, haeMatkanTarinat, lisaaMatkaTarina, muokkaaMatka, poistaTarina, haeKaikkiMatkat,poistaMatka,lisaaMatka, haeMatkanKuvat, muokkaaTarina, lisaaKuva, poistaKuva };
