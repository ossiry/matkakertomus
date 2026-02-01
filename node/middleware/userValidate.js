const sql = require("../database/userSQL");

const validateSignUp = (req, res, next) => {

    console.log('validating sing-up ... : req.body: ', req.body);

    // Nimimerkin tarkistus
    if (!req.body.nimimerkki || req.body.nimimerkki.length < 3) {
        return res.status(400).send({
            msg: 'Nimimerkin täytyy olla vähintään 3 merkkiä pitkä.'
        });
    }

    // Sähköpostin tarkistus
    if (!req.body.email || req.body.email.length < 4) {
        return res.status(400).send({
            msg: 'Email osoitteen täytyy olla vähintään 4 merkkiä pitkä.'
        });
    }

    // Salasanan tarkistus
    if (!req.body.salasana || req.body.salasana.length < 6) {
        return res.status(400).send({
            msg: 'Salasanan täytyy olla vähintään 6 merkkiä pitkä.'
        });
    } else if (req.body.salasana.length > 16) {
        return res.status(400).send({
            msg: 'Salasana voi olla korkeintaan 16 merkkiä pitkä.'
        })
    }

    // Salasanan toiston tarkistus
    if (!req.body.salasana_toisto || req.body.salasana !== req.body.salasana_toisto) {
        return res.status(400).send({
            msg: 'Salasanat eivät täsmää.'
        });
    }
    next();
}

const isOldUser = async (req, res, next) => {

    // Tarkistetaan löytyykö lisättävän käyttäjän nimimerkki tai email jo tietokannasta
    let oldUser = await sql.tarkistaKayttaja(req.body.nimimerkki, req.body.email);

    if (oldUser.length > 0) {
        return res.status(400).send({
            msg: 'Nimimerkki tai sähköpostiosoite on jo käytössä.'
        });
    }
    next();
}

const validateLogin = (req, res, next) => {

    console.log('validating login ... : req.body: ', req.body);

    if (!(req.body.email && req.body.salasana)) {
        return res.status(400).send({
            msg: "Sähköpostia tai salasanaa ei syötetty."
        });
    }
    next();
}

module.exports = { validateSignUp, isOldUser, validateLogin }