// Richie T-57866

// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/wiring-together-a-controller-with-mocha?module_item_id=50760

// Import zipcode model.
const Zipcode = require('../models/zipcodes');

// Declare a global variable to be used in later functions.
let contents = {};
// Got assistance with this function from John Levin.
// Function to determine the distance between two Zip Codes in miles.
const getDistance = function(lat1, lon1, lat2, lon2) {
	var p = 0.017453292519943295;    // Math.PI / 180
	var c = Math.cos;
	var a = 0.5 - c((lat2 - lat1) * p)/2 + 
	        c(lat1 * p) * c(lat2 * p) * 
	        (1 - c((lon2 - lon1) * p))/2;

	return 7917.511731 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km or 3958.7558 mi
}

// Export drivers_controller methods.
module.exports = {
     // create method.
     create(req, res) {
        // Assigns the variable 'zipcodeProps' the value of the 'body' that is sent with the request for this method.
        let data = {};
        const zipcodeProps = req.body;
        // Use 'zipcodeProps' data to create a new 'zipcode' in the database with the .create method of mongoose.
        Zipcode.create(zipcodeProps)
            .then((zipcode) => {
                data.received = true;
                data.zipcode = zipcode;
                res.json(data);
            })
            // If there is an error, catch it.
            .catch((err) => console.log(err))
    },
    // read methods.
    // Function that finds all Zip Codes.
    read(req, res) {
        // https://stack.tlm.cloud/stackoverflow/34665781
        let obj = {};
        Zipcode.findOne({zip: req.params.zipId})
        .then((found) => Zipcode.find()
        .then((collection) => {
            collection.forEach((item) =>{
                if(found && item) {
                    let distance = getDistance(found.latitude, found.longitude, item.latitude, item.longitude);
                    if (distance < 45) {
                        let code = item.zip
                        obj[code] = distance;
                        // obj.push(item.zip);
                    }
                } else {
                    obj['message'] = 'The Zip Code you have entered is not a exisiting Zip Code in California. Please try again.'
                }
            })
        })
        .then(()=>{
            // Send 'new_page' back to the browser.
                res.status(200).json(obj);
            })
            .catch((err) => console.log(err)))
    },
    // Update a Zip Code.
    update(req,res) {
        // Resets 'contents'.
        contents = {};
        contents = {...req.body};
        // Create a new object.
        let data = {};
        // Assign the 'req.body.id' value to 'zipId'.
        const zipId = req.body.zip;
        // Find one 'zipcode' by its id and replace its values with the values of 'contents.
        Zipcode.findOneAndUpdate({ zip: zipId }, contents)
            .then(() => Zipcode.find({ zip: zipId }))
            .then((zipcode) => {
                // Copy the result into 'data'.
                data = {...zipcode[0]._doc};
                console.log('data', data, zipcode[0]);
                // Assign a message to the 'data.message' property.
                data.message = `${data.zip} has been successfully updated!!!`;
                // Send back 'data'.
                res.json(data)
            })
            // If there is an error, catch it and return it.
            .catch((err) => console.log(err))
    },
    // delete method.
    // Function to delete a Zip Code.
    delete(req, res) {
        // Assign the 'req.body.id' value to 'zipId'.
        const zipId = req.body.zip;
        // Find one 'zipcode' by its id and replace its values with the values of 'contents.
        Zipcode.findOne({ zip: zipId })
            .then((old_zipcode) => Zipcode.findByIdAndRemove({ _id: old_zipcode.id }))
            .then((zipcode) => {
                // Copy the result into 'data'.
                data = {...zipcode._doc};
                console.log('data', data, zipcode);
                // Assign a message to the 'data.message' property.
                data.message = `${data.zip} has been successfully deleted!!!`;
                // Send back 'data'.
                res.json(data)
            })
            // If there is an error, catch it and return it.
            .catch((err) => {
                console.log('errrrrrr!!!!!!!!!!!', err);
                res.json(err);
            })
    }
};
