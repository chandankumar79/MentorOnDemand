const mongoose = require('mongoose');

const mentorCourseSchema = new mongoose.Schema({
    mentorId: { type: String, require: true },
    mentorName: { type: String, require: true },
    courseId: { type: String, require: true, unique: true },
    courseName: { type: String, require: true },
    courseRating: { type: Number, default: 5 },
    courseExperience: { type: Number, require: true, default: 0 },
    courseMentorSurcharge: { type: Number, require: true, default: 0 },
    courseFee: { type: Number, require: true, default: 0 },
    courseCommission: { type: Number, require: true, default: 0 },
    courseStartDate: { type: Date, require: true },
    courseEndDate: { type: Date, require: true },
    courseDuration: { type: Number, require: true },
    courseStatus: { type: Boolean, default: true },
});

module.exports = mongoose.model('MentorCourses', mentorCourseSchema);