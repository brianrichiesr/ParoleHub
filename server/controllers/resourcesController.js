// Richie T-57866

// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/wiring-together-a-controller-with-mocha?module_item_id=50760

// Import resources model.
const Resource = require('../models/resources');

// Export resourcesController methods.
module.exports = {
     // create method.
     create(req, res) {
        // Create a new object.
         let data = {};
        // Assigns the variable 'resourceProps' the value of a copy of the 'body' that is sent with the request for this method.
        const resourceProps = {...req.body};
        // Use 'resourceProps' data to create a new 'resource' in the database with the .create method of mongoose. 
        Resource.create(resourceProps)
            .then((resource) => {
                data.received = true;
                data.resource = resource;
                res.json(data);
            })
            // If there is an error, catch it.
            .catch((err) => console.log(err))
    },
    // Uses the 'findById' method to get a resource and send it back to the client to be displayed.
    displayOne(req,res) {
        const resourceId = req.params.id;
        Resource.findById({ _id: resourceId })
            .then((resource) => {
                res.send(resource);
            })
             // If there is an error, catch it and console.log it.
            .catch((err) => {
                console.log(err);
                res.status(500).json({success: false, message:"Something went wrong."})
            })
    },
    // Update a resource.
    update(req,res) {
        // Assigns the value of the 'params.id' to a variable.
        const resourceId = req.params.id;
        // Assigns the variable 'contents' the value of a copy of the 'body' that is sent with the request for this method.
        let contents = {...req.body};
        // Create a new object.
        let data = {};
        //  Find one 'resource' by its id and replace its values with the values of 'contents.
        Resource.findOneAndUpdate({ _id: resourceId}, contents)
            .then(() => Resource.find({  _id: resourceId }))
            .then((resource) => {
                // Copy the result into 'data'.
                data = {...resource[0]._doc};
                // Assign a message to the 'data.message' property.
                data.message = `${data.name} has been successfully updated!!!`;
                // Send back 'data'.
                res.json(data)
            })
            // If there is an error, catch it and console.log it.
            .catch((err) => console.log(err))
    },
    // Get all the resources that are in the 'req.body'.
    getByZipcode(req, res) {
        // Create 2 arrays.
        let codes = [];
        let results = [];
        // Put all the zipcodes from the req.body in an array.
        for (let key in req.body) {
            if (key !== 'filters'){
                codes.push(key);
            }
        }
        // Find all the resources that have a zipcode in the array.
        Resource.find({zip: {$in: codes}}).sort({name: 1})
        .then((collection) =>{
            // If there are any results.
            if (collection.length > 0) {
                // Iterate through the results.
                collection.forEach((each) =>{
                    let bool = true;
                    if (req.body.filters.length > 0) {
                        req.body.filters.map((item) => {
                            if (each.keywords.includes(item) || each.restrictions.includes(item)) {
                                return bool = false;
                            }
                        })
                    }
                    if (req.body.filters.length === 0 || bool === false) {
                        // Create a copy of the relevant information of the index.
                        let resource = {...each._doc};
                        // Add the property 'distance' to the copy with value of the index's 'zip'.
                        resource['distance'] = req.body[each.zip];
                        // Push the copy into the other array.
                        results.push(resource);
                    }
                });
            // If there are no results, send a message.
            } else {
                results = {message: 'Sorry, no resources within 45 miles of this Zip Code.'}
                res.json(results)
            }
        })
        // Send a response that is a json object of the results.
        .then(() => {
            if (results.length > 0) {
                res.json(results)
            } else {
                results = {message: 'Sorry, no resources within 45 miles of this Zip Code that meet your requirements.'}
                res.json(results)
            }
        })
        // If there is an error, catch it and console.log it.
        .catch((err) => {
            console.log('errrrrrr!!!!!!!!!!!22222222', err);
        });
    },
    // Get all the resources that are in the 'req.body'.
    getByCounty(req, res) {
        let results = [];
        let errBool = false;
        let county = req.params.county.split(' ');
        if (county[county.length - 1].toLowerCase() !== 'county') {
            county[county.length] = 'county'
        }
        let testedCounty = county.join(' ');
        // Find all the resources that have a zipcode in the array.
        Resource.find({county: { $regex : new RegExp(testedCounty.split('').join('.*'), "i") } }).sort({name: 1})
        .then((collection) =>{
            // If there are any results.
            if (collection.length > 0) {
                // Iterate through the results.
                collection.forEach((each) =>{
                    let bool = true;
                    if (req.body.filters.length > 0) {
                        req.body.filters.map((item) => {
                            if (each.keywords.includes(item) || each.restrictions.includes(item)) {
                                return bool = false;
                            }
                        })
                    }
                    if (req.body.filters.length === 0 || bool === false) {
                        // Create a copy of the relevant information of the index.
                        let resource = {...each._doc};
                        // Push the copy into the other array.
                        results.push(resource);
                    }
                });
            // If there are no results, send a message.
            } else {
                results = {message: 'Sorry, no resources within this County that meet your requirements.'}
                errBool = true;
                res.json(results);
            }
        })
        // Send a response that is a json object of the results.
        .then(() => {
            if(!errBool) {
                if (results.length > 0) {
                    res.json(results)
                } else {
                    results = {message: 'Sorry, no resources within this County that meet your requirements.'}
                    res.json(results)
                }
            }
        })
        // If there is an error, catch it and console.log it.
        .catch((err) => {
            console.log('errrrrrr!!!!!!!!!!!22222222', err);
        });
    },
     // Get all the resources that are in the 'req.body'.
     getByName(req, res) {
        let results = [];
        let errBool = false;
        let resourceName = req.params.resourceName;
        // Find all the resources that have a zipcode in the array.
        // Different ways of searching. I have not decided which way is best for this app.
        // Search the name field by order of letters entered by user.
        // Resource.find({name: { $regex : new RegExp(resourceName.split('').join('.*'), "i") } }).sort({name: 1})
        // Search the name field by exactly what is entered by user.
        // Resource.find({$text: { $search : resourceName } }, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})
        // Search the name field by what is entered as a whole and each word entered by user.
        Resource.find({$text: { $search : "\'" + resourceName + "'\ " + resourceName} }, {score: {$meta: "textScore"}}).sort({name: 1})
        .then((collection) =>{
            // If there are any results.
            // console.log('results', collection);
            if (collection.length > 0) {
                // Iterate through the results.
                collection.forEach((each) =>{
                    let bool = true;
                    if (req.body.filters.length > 0) {
                        req.body.filters.map((item) => {
                            if (each.keywords.includes(item) || each.restrictions.includes(item)) {
                                return bool = false;
                            }
                        })
                    }
                    if (req.body.filters.length === 0 || bool === false) {
                        // Create a copy of the relevant information of the index.
                        let resource = {...each._doc};
                        // Push the copy into the other array.
                        results.push(resource);
                    }
                });
            // If there are no results, send a message.
            } else {
                results = {message: 'Sorry, no resources with that name that meet your requirements.'}
                errBool = true;
                res.json(results);
            }
        })
        // Send a response that is a json object of the results.
        .then(() => {
            if(!errBool) {
                if (results.length > 0) {
                    // console.log('results', results);
                    res.json(results)
                } else {
                    results = {message: 'Sorry, no resources with that name that meet your requirements.'}
                    res.json(results)
                }
            }
        })
        // If there is an error, catch it and console.log it.
        .catch((err) => {
            console.log('errrrrrr!!!!!!!!!!!22222222', err);
        });
    },
    delete(req, res) {
        // Assign the 'req.params.id' to the variable 'resouceId'.
        const resouceId = req.params.id;
        // Find and delete 'resource' by its id.
        Resource.findByIdAndRemove({ _id: resouceId })
            // Sends back the deleted 'resource'.
            .then(resource => res.json(resource))
            // If there is an error, catch it and return it.
            .catch((err) => console.log(err))
   }
};
