const express = require("express");
const router = express.Router();

let tripCtrl = require('../controllers/tripController');
let tripVal = require('../middleware/tripValidate');

router.route('/travel/self')
    .put(tripCtrl.modOwnTrip)
    .delete(tripVal.delValidate,tripCtrl.delOwnTrip)
router.route('/travel/self/add') 
    .post(tripCtrl.addTrip);
router.route('/travel/self/:id')
    .post(tripCtrl.fetchOwnTrips);
router.route('/travel/self/stories')
    .put(tripCtrl.updateStory)
    .delete(tripCtrl.delPhoto,tripCtrl.delStory);
router.route('/travel/self/stories/add')
    .post(tripCtrl.addTripStory);
router.route('/travel/self/stories/:id')
    .post(tripCtrl.fetchTripStories);
router.route('/travel/all')
    .get(tripCtrl.fetchAllTrips);

router.route("/travel/all/images")
    .get(tripCtrl.fetchTripImages);

module.exports = router