const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentCourseSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    mentorId: { type: String, required: true },
    courseProgress: { type: Number, default: 0 }, // 0 > 25 > 50 > 75 > 100
    courseRating: { type: Number, required: true }, // 0 - 5
    courseStatus: { type: String, default: 'pending' }, // pending > active > completed
    paymentStatus: { type: Boolean, required: true }, // true: completed, false: pending
    paymentId: { type: String, default: null }
})

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: false }, // required
    studentFirstName: { type: String, required: true },
    studentLastName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentPassword: { type: String, required: true },
    studentDOB: { type: Date, required: false }, // required
    studentSex: { type: Boolean, required: true }, // {male: true, female: false}
    studentContactNumber: { type: String, required: true },
    studentLinkedInProfile: { type: String, required: false },
    studentCourses: [studentCourseSchema],
    studentPaymentTotal: { type: Number, default: 0 },
    studentStatus: { type: Boolean, default: true }, // true: Active, false: Blocked
    studentSaltSecret: String, // * added to accomodate bycrypt's functioning 
}, { writeConcern: { w: 'majority', j: true, wtimeout: 1000 } });

// Events
studentSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.studentPassword, salt, (err, hash) => {
            this.studentPassword = hash;
            this.studentSaltSecret = salt;
            next();
        });
    });
});

// Methods
studentSchema.methods.verifyPassword = function(password) {
    // console.log('verify password: ', password, this.password, bcrypt.compareSync(password, this.password)); return true;
    return bcrypt.compareSync(password, this.studentPassword);
};

studentSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id, userType: 'student' },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

module.exports = mongoose.model('Student', studentSchema);