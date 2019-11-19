const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseImageSource: { type: String, required: true },
    courseFee: { type: Number, required: true },
    courseCommission: { type: Number, required: true },
    courseMentors: [{ type: String, required: true }], // array of mentorIds
    courseStudents: [{ type: String, require: true }], // array of studentIds
    courseStatus: {type: Boolean, default: true },
});

module.exports = mongoose.model('Course', courseSchema);