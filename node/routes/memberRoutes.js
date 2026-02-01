const express = require('express');
const router = express.Router();

let memberCtrl = require('../controllers/memberController');
// let userVal = require('../middleware/userValidate');

router.route('/members')
    .get(memberCtrl.fetchAllMembers);

module.exports = router