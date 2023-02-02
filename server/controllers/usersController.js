// Richie T-57866

// The core code of this page was supplied by https://canvas.tlm.cloud/courses/74/pages/wiring-together-a-controller-with-mocha?module_item_id=50760

// Import resources model.
const User = require('../models/users');
const createJWT = require('../helper/createJWT');
const bcrypt = require('bcrypt');
const SALT = 10;

// Export usersController methods.
module.exports = {
    // Function that creates a user.
    async createUser(req, res){
        try {
            const { username, email, password } = req.body;
            // Check to see if all credentials are present
            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'You must provide a user credentials',
                });
            }
            // Check and see if user already exists 
            const user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered.',
                });
            }
            // Create a new user if new user
            const createdUser = await User.create(req.body);
            // Generate token
            const token = await createJWT(createdUser);
            // Return token to Frontend
            return res.status(200).json({
                success: true,
                token: token,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
            success: false,
            message: 'Failed creating user, something went wrong.',
            });
        }
    },
    // Function that logs a user in.
    async loginUser(req, res){
        try{
            debugger
            const {username, email, password} = req.body;
            // Make sure the email and password are present for login
            if(!email || !password) {
                return res.status(400).json({ success:false, error:"Invalid credentials."});
            } 
            const user = await User.findOne({username: username,email:email});
            // Check to see if user exists
            if(!user) {
                return res.status(404).json({success:false, error:"Either your username or email was wrong. Please ensure that they are entered correctly and try again."});
            }
            // Proceed with the login
            user.comparePassword(password, async (err, isMatch) => {
                // Check to see if any errors are present
                if(err) { 
                    return res.status(400).json({success:false, error:"Something went wrong during login."});
                }
                // Check to see if the password was a match
                if(!isMatch) {
                    return res.status(400).json({success:false, error:"Wrong password buddy!"});
                }
                // Else, generate a new JWT token
                const token = await createJWT(user);
                return res.status(200).json({success:true, token:token, message:"Successful login."});
            });
        } catch(err) {
            console.log(err);
            res.status(500).json({success:false, message:"Failed logging in user, something went wrong."})
        }
    },
    // Function that gets user data based the user _id.
    async getUser(req, res){
        try{
            // Check to see if user exists
            const user = await User.findOne({_id: req.user}).select('username email status');
            // Check to see if user exists or err
            if(!user) {
                return res.status(500).json({success: false, message:"Something went wrong."});
            }
            // Return user to FE
            res.status(200).json({success:true, user:user});
        } catch(err) { 
            console.log(err);
            res.status(500).json({success: false, message:"Something went wrong."})
        }
    },
    // Function that gets user data for the update page.
    async getUserForUpdate(req, res){
        try{
            // Check to see if user exists
            const user = await User.findOne({_id: req.params.userid});
            // Check to see if user exists or err
            if(!user) {
                return res.status(500).json({success: false, message:"Something went wrong."});
            }
            // Return user to FE
            res.status(200).json({success:true, user:user});
        } catch(err) { 
            console.log(err);
            res.status(500).json({success: false, message:"Something went wrong."})
        }
    },
    // Function that gets all the users.
    async getAllUsers(req, res){
        try{
            // Check to see if user exists
            const users = await User.find({_id: {$ne: req.user}});
            // Check to see if user exists or err
            if(!users) {
                return res.status(500).json({success: false, message:"There are no users in the database."});
            }
            // Return user to FE
            res.status(200).json({success:true, users:users});
        } catch(err) { 
            console.log(err);
            res.status(500).json({success: false, message:"Something went wrong."})
        }
    },
    // Function that updates a user.
    updateUser(req, res){
        // Assigns the value of the 'params.id' to a variable.
        const userId = req.params.id;
        // Assigns the variable 'contents' the value of a copy of the 'body' that is sent with the request for this method.
        let contents = {...req.body};
        bcrypt.genSalt(SALT, function(err, salt) {
            // Hash password and save
            bcrypt.hash(contents.password, salt, function(err, hash){
                // If err, return
                contents.password = hash;
                let data = {};
                // Check and see if user already exists 
                User.findOne({ _id: {$ne: userId}, email: contents.email })
                    .then(user => {
                        if (user) {
                            res.send({updateMessage:"Email already registered."});
                            return;
                        } else {
                            User.findOneAndUpdate({ _id: userId}, contents)
                            .then(() => User.find({  _id: userId }))
                            .then((resource) => {
                                // Copy the result into 'data'.
                                data = {...resource[0]._doc};
                                // Assign a message to the 'data.message' property.
                                data.message = `${data.name} has been successfully updated!!!`;
                                // Send back 'data'.
                                res.json(data);
                            })
                            // If there is an error, catch it and console.log it.
                            .catch((err) => {
                                console.log('-------------------err--------------------', err);
                                res.json(err);
                            })
                        }
                    })
                    // If there is an error, catch it and console.log it.
                    .catch((err) => {
                        console.log('-------------------err--------------------', err.message);
                        res.json(err.message);
                    })
            });
        });
    },
    // Function that deletes a user.
    delete(req, res) {
         // Assign the 'req.params.id' to the variable 'userId'.
         const userId = req.params.id;
         // Find and delete 'user' by its id.
         User.findByIdAndRemove({ _id: userId })
             // Sends back the deleted 'user'.
             .then(user => res.json(user))
             // If there is an error, catch it and return it.
             .catch((err) => console.log(err))
    }
}