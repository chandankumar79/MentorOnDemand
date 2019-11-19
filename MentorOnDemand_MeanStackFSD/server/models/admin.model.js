const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminId: { type: Number, required: true },
    adminFirstName: { type: String, required: true },
    adminLastName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminPassword: { type: String, required: true },
    adminDOB: { type: Date, required: true },
    adminSex: { type: Boolean, required: true },
    adminCourses: [{
        courseId: { type: String, required: true },
        courseName: { type: String, required: true },
        courseDescription: { type: String, required: true },
        courseIconSource: { type: String, required: true },
        courseFee: { type: Number, required: true },
        courseCommission: { type: Number, required: true },
        courseTotalFee: { type: Number, required: true },
        courseMentors: [{ type: String, required: true }], // array of mentorIds
    }],
    adminStatus: { type: Boolean, default: true }, // true: Active, false: Blocked
    adminSaltSecret: String, // * added to accomodate bycrypt's functioning 
});

// Events
adminSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.adminPassword, salt, (err, hash) => {
            this.adminPassword = hash;
            this.adminSaltSecret = salt;
            next();
        });
    });
});

// Methods
adminSchema.methods.verifyPassword = function(password) {
    // console.log('verify password: ', password, this.password, bcrypt.compareSync(password, this.password)); return true;
    return bcrypt.compareSync(password, this.adminPassword);
};

adminSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id, userType: 'admin' },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

module.exports = mongoose.model('Admin', adminSchema);