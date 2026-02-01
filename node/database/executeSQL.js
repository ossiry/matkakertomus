const connection = require("../config/dbConnection");

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function(error, results, fields) {
            if (error) {
                console.log("error: ", error);
                reject(error);
            } else {
                console.log("results: ", results);
                resolve(results);
            }
        });
    });
}

module.exports = executeSQL;