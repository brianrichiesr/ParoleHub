// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/setting-up-router-with-mocha?module_item_id=50757

// Declare variables necessary to run an express app.
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// week_04_fetch_and_forms README.md --- bodyParser no longer necessary.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));
// Import mongoose.
const mongoose = require('mongoose');
// Import routes.js from routes folder in the same directory as app.js.
const routes = require('./routes/routes');
// Make the promise method available.
mongoose.Promise = global.Promise;
// Connect to mongodb - ride-share database.
mongoose.connect('mongodb://localhost/reentry-project',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        }
);
// .on happens everytime event occurs.
mongoose.connection.on('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
});
// Use the app design for 'routes'.
routes(app)

module.exports = app;