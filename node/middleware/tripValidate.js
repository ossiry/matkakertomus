const sql = require("../database/tripSQL");

const delValidate = async (req, res, next) => {

   // Tarkistetaan onko matkaan liitetty tarinoita
   let tarinat = await sql.haeMatkanTarinat(req.body.idmatka);

   if (tarinat.length===0) {
        next();
   }
   else{
        return res.status(400).send({
            msg: 'Poista matkan tarinat ensin!'
        });
   }
   
}
module.exports = { delValidate }