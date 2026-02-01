const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('../database/userSQL');
const JWTSECRETKEY = require('../config/authKey');

const registerUser = async (req, res) => {

    console.log('sign-up started ...');

    let { nimimerkki, etunimi, sukunimi, salasana, email } = req.body;

    try {
        // Muodostetaan salasanasta tiiviste
        let salattuSalasana = await bcrypt.hash(salasana, 10);

        // Lisätään käyttäjä tietokantaan
        let result = await sql.lisaaKayttaja(nimimerkki, etunimi, sukunimi, salattuSalasana, email);

        if (result.affectedRows === 0) {
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: "Rekisteröityminen epäonnistui!" })
        } else {
            // Muodostetaan tokeni tässä vaiheessa
            let token = jwt.sign({
                tunnus: result.nimimerkki,
                email: result.email,
            }, JWTSECRETKEY, {
                expiresIn: '1h'
            });

            // Muodostetaan eväste
            res.cookie('jwt', token, { expires: new Date(Date.now() + 3600 * 100 * 1000), httpOnly: true });

            // Palautetaan lisätyn käyttäjän id, tiedot ja tokeni
            res.statusCode = 201;
            res.json({
                status: 'Created', msg: 'Rekisteröityminen onnistui!', id: result.insertId, nimimerkki: nimimerkki,
                etunimi: etunimi, sukunimi: sukunimi, email: email, token: token
            });
        }
    } catch (err) {
        console.log('Error in server! ', err);
        res.statusCode = 400;
        res.json({ status: 'NOT OK', msg: 'Tapahtui virhe rekisteröitymisessä.' });
    }
}

const loginUser = async (req, res) => {

    console.log('login started ...');

    let { email, salasana } = req.body;

    try {
        // Haetaan käyttäjä tietokannasta, jos olemassa
        let result = await sql.haeKayttaja(email);

        if (!result.length) {
            return res.status(400).send({
                msg: 'Käyttäjätunnus tai salasana väärin!'
            });
        } else {
            // Verrataan käyttäjän syöttämää ja tietokannasta haettua salattua salasanaa
            bcrypt.compare(salasana, result[0]['password'], (bErr, bResult) => {
                if (bErr) {
                    return res.status(400).send({
                        success: 'false',
                        status: 'NOT OK',
                        msg: 'Nimimerkki tai salasana väärin!'
                    });
                }
                // Muodostetaan tokeni tässä vaiheessa
                if (bResult) {
                    const token = jwt.sign({
                        tunnus: result[0]['nimimerkki'],
                        email: result[0]['email']
                    }, JWTSECRETKEY, {
                        expiresIn: '2h'
                    });

                    // Muodostetaan eväste
                    res.cookie('jwt', token, { expires: new Date(Date.now() + 3600 * 100 * 1000), httpOnly: true });

                    res.statusCode = 200;
                    res.json({ status: 'OK', msg: 'Kirjautuminen onnistui!', token, data: result });
                } else {
                    return res.status(400).send({
                        success: 'false',
                        status: 'NOT OK',
                        msg: 'Nimimerkki tai salasana väärin!'
                    });
                }
            })
        }
    } catch (err) {
        console.log('Error in server! ', err);
        res.statusCode = 400;
        res.json({ status: 'NOT OK', msg: 'Tapahtui virhe kirjautumisessa!' });
    }
}

const fetchProfileInfo = async (req, res) => {

    console.log('fetching user info started ...');

    try {
        let result = await sql.haeKayttajaTiedot(req.query.email);

        if (!result.length) {
            res.statusCode = 400;
            res.json({ status: 'NOT OK', msg: 'Käyttäjän tietoja ei löytynyt!' })
        } else {
            res.statusCode = 200;
            res.json({ status: 'OK', msg: 'Käyttäjän tietojen haku onnistui!', result });
        }
    } catch (err) {
        console.log("Error in server! ", err);
        res.statusCode = 400;
        res.json({ status: "NOT OK", msg: "Tapahtui virhe haettaessa käyttäjän tietoja!" });
    }
}

const addProfilePicture = async (req, res) => {

    console.log("insertin profile picture path started ...");

    let { kuva, id } = req.body;

    try {
        let result = await sql.lisaaProfiiliKuva(kuva, id);

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

const updateProfileInfo = async (req, res) => {

    console.log("updating profile info started ...")

    let { idmatkaaja, email, nimimerkki, etunimi, sukunimi, paikkakunta, esittely } = req.body;

    try {
        let result = await sql.paivitaProfiilia(idmatkaaja, email, nimimerkki, etunimi, sukunimi, paikkakunta, esittely);

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

module.exports = { registerUser, loginUser, fetchProfileInfo, addProfilePicture, updateProfileInfo }