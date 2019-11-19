const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mentorSchema = new mongoose.Schema({
    // mentorId: { type: String, required: true },
    mentorFirstName: { type: String, required: true },
    mentorLastName: { type: String, required: true },
    mentorEmail: { type: String, required: true },
    mentorPassword: { type: String, required: true },
    mentorDOB: { type: Date, required: true },
    mentorSex: { type: Boolean, required: true },
    mentorContactNumber: { type: String, required: true },
    mentorLinkedInProfile: { type: String, required: true },
    mentorRatings: { type: Number, max: 5, min: 0, default: 5 }, // average of all the ratings available
    mentorStatus: { type: Boolean, default: true }, // true: Active, false: Blocked
    mentorPaymentCompleted: { type: Number, default: 0 },
    mentorPaymentDue: { type: Number, default: 0 },
    mentorSaltSecret: String, // * added to accommodate bycrypt's functioning 
});

// Events
mentorSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.mentorPassword, salt, (err, hash) => {
            this.mentorPassword = hash;
            this.mentorSaltSecret = salt;
            next();
        });
    });
});

// Methods
mentorSchema.methods.verifyPassword = function(password) {
    // console.log('verify password: ', password, this.password, bcrypt.compareSync(password, this.password)); return true;
    return bcrypt.compareSync(password, this.mentorPassword);
};

mentorSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id, userType: 'mentor' },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

module.exports = mongoose.model('Mentor', mentorSchema);