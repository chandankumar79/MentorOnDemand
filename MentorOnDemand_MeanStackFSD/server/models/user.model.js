const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// var userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: 'Full name can\'t be empty'
//     },
//     email: {
//         type: String,
//         required: 'Email can\'t be empty',
//         unique: true
//     },
//     password: {
//         type: String,
//         required: 'Password can\'t be empty',
//         minlength: [4, 'Password must be atleast 4 character long']
//     },
//     saltSecret: String
// });

const userSchema = new mongoose.Schema({ // * changed adminSchema to userSchema
    // adminId: { type: Number, required: true },
    adminFirstName: { type: String, required: true },
    adminLastName: { type: String, required: true },
    adminEmail: { type: String, required: true }, // TODO implement unique email registrations only
    adminPassword: { type: String, required: true }, // TODO implement password validation if needed
    adminDOB: { type: Date, required: true },
    adminSex: { type: Boolean, required: true }, // * true: male
    adminContactNumber: { type: String, required: true },
    // adminCourses: [{
    //     courseId: { type: String, required: true },
    //     courseName: { type: String, required: true },
    //     courseDescription: { type: String, required: true },
    //     courseIconSource: { type: String, required: true },
    //     courseFee: { type: Number, required: true },
    //     courseCommission: { type: Number, required: true },
    //     courseTotalFee: { type: Number, required: true },
    //     courseMentors: [{ type: String, required: true }], // array of mentorIds
    // }],
    adminStatus: { type: Boolean, default: true }, // true: Active, false: Blocked
    // userType: { type: String, required: true },
    // email: { type: String, required: true }, // TODO implement unique email registrations only
    // password: { type: String, required: true }, // TODO implement password validation if needed
    saltSecret: String, // * added to accomodate bycrypt's functioning 
});

// module.exports = mongoose.model('Admin', adminSchema);

// Custom validation for email
userSchema.path('adminEmail').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.adminPassword, salt, (err, hash) => {
            this.adminPassword = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function(password) {
    // console.log('verify password: ', password, this.password, bcrypt.compareSync(password, this.password));
    // return true;
    return bcrypt.compareSync(password, this.adminPassword);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);