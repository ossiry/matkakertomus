const executeSQL = require("./executeSQL");

const paivitaKuvanPolku = (polku, id) => {
    let query = "UPDATE matkakohde SET kuva = ? WHERE idmatkakohde = ?";
    let params = [polku, id];

    console.log("--- SQL paivitaKuvanPolku---\nQUERY: ", query + "\nPARAMS: ", params);
    return executeSQL(query, params);
}

module.exports = { paivitaKuvanPolku }