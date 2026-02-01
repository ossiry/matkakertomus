const express = require('express');
const router = express.Router();

let travelCtrl = require('../controllers/travelController');
// let userVal = require('../middleware/userValidate');

router.route('/destination')
    .get(travelCtrl.fetchAllDestinations)
    .post(travelCtrl.addDestination)
    .put(travelCtrl.modDestination)
    .delete(travelCtrl.delDestination);

router.route('/destination/popular')
    .get(travelCtrl.fetchPopularDestinations);

router.route('/destination/one')
    .get(travelCtrl.fetchOneDestination);

router.route('/destination/query')
    .get(travelCtrl.fetchDestinationsByParams);

module.exports = router