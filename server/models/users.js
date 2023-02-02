const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SALT = 10;

const User = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true },
)

/*  Hash user password before saving  */
User.pre('save', function(next) {
    const user = this;
    // Create salt string
    bcrypt.genSalt(SALT, function(err, salt) {
        // If err, return
        if(err) return next(err);
        // Hash password and save
        bcrypt.hash(user.password, salt, function(err, hash){
            // If err, return
            if(err) return next(err);
            user.password = hash;
            next(); // Proceed with the next operation
        });
    });
});

/*  Compare login password with user's password from the database  */
User.methods.comparePassword = function(loginPass, callBack) {
    // Use bcrypt to compare and decrypt password in the db.
    bcrypt.compare(loginPass, this.password, function(err, isMatch){
        // If err, then return the error
        if(err) return callBack(err);
        // Return isMatch parameter (true or false)
        callBack(null, isMatch);
    });
}

module.exports = mongoose.model('users', User)