const jwt = require("jsonwebtoken");

const JWTSECRETKEY = require('../config/authKey');
const sql = require('../database/userSQL');

const verifyToken = (req, res, next) => {

  try {
    console.log("req.headers.split: ", req.headers.authorization.split(' ')[0]);
    let token = req.headers.authorization.split(' ')[0];

    if (!token) {
      return res.status(403).send({
        msg: "Tokenia ei annettu!"
      });
    }

    jwt.verify(token, JWTSECRETKEY, (err, decoded) => {

      if (err) {
        // if (err === jwt.TokenExpiredError) { // TODO: Tähän tokenin expiration-tarkistus
        //   return res.status(401).send({ msg: "Istuntosi on vanhentunut!"})
        // }
        return res.status(401).send({ msg: "Istuntosi ei ole voimassa!" });
      }

      res.userEmail = decoded.email;
      next();
    });
  } catch (err) {
    return res.status(401).send({
      msg: "Istuntosi ei ole voimassa!"
    });
  }
}

const checkPrivileges = async (req, res, next) => {

  let email = req.userEmail || '';
  let trueUser = await sql.haeKayttaja(email);

  if (trueUser.length > 0) {
    return res.status(400).send({
      msg: "Istuntosi ei ole pätevä!"
    });
  }
  next();
}

module.exports = { verifyToken, checkPrivileges }