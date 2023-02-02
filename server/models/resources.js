// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/setting-up-a-model-with-mocha?module_item_id=50758

// Import mongoose.
const mongoose = require('mongoose');
// Use the Schema method of mongoose.
const Schema = mongoose.Schema;
// Create a new Schema.
const ResourceSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    county: {
        type: String
    },
    tel_number: {
        type: String
    },
    website: {
        type: String
    },
    email: {
        type: String
    },
    keywords: {
        type: [String]
    },
    description: {
        type: String
    },
    restrictions: {
        type: [String]
    },
    rating: {
        type: Number
    },
    vote_count: {
        type: Number
    },
    comments: {
        type: [String]
    }
});
/* Had a problem with searches due to name not being declared searchable by text. Text field was not being created for the name field. Found fix on https://stackoverflow.com/questions/59920729/index-is-not-getting-created-text-index-required-for-text-query-mongoose */
ResourceSchema.index({ name: 'text', description: 'text', tags: 'text'});
// Declare 'Resource' with the model named 'Resource' based on 'ResourceSchema' Schema.
const Resource = mongoose.model('resource', ResourceSchema);
module.exports = Resource;