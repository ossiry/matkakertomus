const express = require('express');
const router = express.Router();

let uploader = require('../middleware/fileUploader');
let fileCtrl = require('../controllers/fileController');
// let userVal = require('../middleware/userValidate');

router.route("/destination/upload/:source")
    .post(uploader.fileUploader, (req, res) => {
        res.statusCode = 201;
        res.json({
            status: 'Created', data: req.file
        });
    })
    .put(uploader.fileUploader, (req, res) => {
        res.statusCode = 201;
        res.json({
            status: 'Created', data: req.file
        });
    });

router.route('/destination/upload/:source/:id')
    .put(uploader.fileUploader, fileCtrl.updateDestinationPicture);

router.route("/profile/upload/:source")
    .post(uploader.fileUploader, (req, res) => {
        res.statusCode = 201;
        res.json({
            status: 'Created', data: req.file
        });
    });

router.route("/travel/self/upload/:source")
    .post(uploader.fileUploader, (req, res) => {
        res.statusCode = 201;
        res.json({
            status: 'Created', data: req.file
        });
    });
router.route("/travel/self/update/upload/:source")
    .post(uploader.fileUploader, (req, res) => {
        res.statusCode = 201;
        res.json({
            status: 'Created', data: req.file
        });
    });    

// router.route('/story/upload/')
//     .post(uploader.multipleFileUploader, (req, res) => {
//         res.statusCode = 201;
//         res.json({
//             status: 'Created', data: req.files
//         });
//     })

module.exports = router