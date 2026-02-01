const express = require("express");
const router = express.Router();

let userVal = require('../middleware/userValidate');
let userAuth = require('../middleware/jwtAuth');
let userCtrl = require("../controllers/userController");

router.route("/sign-up")
    .post(userVal.validateSignUp, userVal.isOldUser, userCtrl.registerUser);

router.route("/login")
    .post(userVal.validateLogin, userCtrl.loginUser);

router.route("/profile")
    .get(userAuth.verifyToken, userAuth.checkPrivileges, userCtrl.fetchProfileInfo)
    //.get(userCtrl.fetchProfileInfo)
    .put(userCtrl.updateProfileInfo);

router.route("/profile/image")
    .put(userCtrl.addProfilePicture);

module.exports = router