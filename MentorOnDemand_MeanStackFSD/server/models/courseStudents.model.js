const mongoose = require('mongoose');

const courseStudents = new mongoose.Schema({
    studentId: { type: String, require: true },
    mentorId: { type: String, require: true },
    courseId: { type: String, require: true },
    studentName: { type: String, require: true },
    mentorName: { type: String, require: true },
    courseName: { type: String, require: true },
    courseDuration: { type: Number, require: true },
    courseStartDate: { type: Date, require: true },
    courseEndDate: { type: Date, require: true },
    courseTotalFee: { type: Number, require: true },
    courseRating: { type: String, default: 0 },
    courseProgress: { type: Number, default: 0 },
    courseStatus: { type: String, default: 'Pending' }, // pending, active, completed
    coursePaymentStatus: { type: Boolean, default: false },
    coursePaymentId: { type: String, default: null }
});

module.exports = mongoose.model('CourseStudents', courseStudents);