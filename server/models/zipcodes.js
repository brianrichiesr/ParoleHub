// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/setting-up-a-model-with-mocha?module_item_id=50758

// Import mongoose.
const mongoose = require('mongoose');
// Use the Schema method of mongoose.
const Schema = mongoose.Schema;
// Create a new Schema.
const ZipcodeSchema = new Schema ({

    zip: {
        type: Number,
        required: true,
        unique: true
    },
    type: {
        type: String
    },
    primary_city: {
        type: String
    },
    state: {
        type: String
    },
    county: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});
// Declare 'Zipcode' with the model named 'Zipcode' based on 'ZipcodeSchema' Schema.
const Zipcode = mongoose.model('zipcode', ZipcodeSchema);
module.exports = Zipcode;