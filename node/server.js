// ASENNA ensin tarvittaessa:
// npm install bcryptjs cors express express-validator fs-extra jsonwebtoken multer mysql mysql2 nodemon path uuid

const express = require('express');
// const cors = require('cors');

let port = process.env.PORT || 3002;
let hostname = '127.0.0.1'; // localhost

const app = express();

const cors = function (req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     next();
 }

app.use(express.json());
app.use(cors);

const userRouter = require('./routes/userRoutes');
const travelRouter = require('./routes/travelRoutes');
const fileRouter = require('./routes/fileRoutes');
const memberRouter = require('./routes/memberRoutes');
const tripRouter = require('./routes/tripRoutes');

// app.use('/api', router);
app.use(userRouter, travelRouter, fileRouter, memberRouter, tripRouter);

app.listen(port, hostname, () => {
    console.log(`Server listening on http://${hostname}:${port}/`);
});

module.exports = app