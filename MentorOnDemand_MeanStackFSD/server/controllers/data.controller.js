const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const Course = mongoose.model('Course');
const Mentor = mongoose.model('Mentor');
const Student = mongoose.model('Student');
const MentorCourses = mongoose.model('MentorCourses');
const CourseStudents = mongoose.model('CourseStudents');

module.exports.addTech = (req, res, next) => {
    // console.log('DataController | addTech: ' + JSON.stringify(req.body))
    let course = new Course(req.body);
    course.save((err, doc) => {
        if (!err) res.send(doc);
        else {
            if (err.code == 11000) res.status(422).send(['Course is already registered.']);
            else return next(err);
        }
    });
}

module.exports.allCourses = (req, res, next) => {
    // console.log('*** ***');
    Course.find({}, (err, course) => {
        if (err) {
            console.log(err);
        } else {
            if (!course) {
                console.log('No courses found!');
                return res.status(404).json({ status: false, message: 'No courses found' });
            } else {
                // console.log(course);
                return res.status(200).json({ status: true, courses: course })
            }
        }
    })
}

module.exports.adminGetMentors = (req, res, next) => {
    const mentorDataItems = '_id mentorId mentorFirstName mentorLastName mentorEmail mentorRatings mentorCourses mentorPaymentDue mentorPaymentCompleted mentorStatus';
    Mentor.find({}, mentorDataItems, (err, mentor) => {
        if (err) {
            console.log(err);
        } else {
            if (!mentor) {
                console.log('No mentors found!')
                return res.status(404).json({ status: false, message: 'No mentors found!' })
            } else {
                return res.status(200).json({ status: true, message: 'The following mentors found!', mentors: mentor });
            }
        }
    })
}

module.exports.adminGetStudents = (req, res, next) => {
    // TODO: determine what fields to return
    const studentDataItems = '_id studentId studentFirstName studentLastName studentEmail studentCourses studentPaymentTotal studentStatus';
    Student.find({}, studentDataItems, (err, student) => {
        if (err) {
            console.log(err);
        } else {
            if (!student) {
                console.log('No students found!')
                return res.status(404).json({ status: false, message: 'No students found!' })
            } else {
                return res.status(200).json({ status: true, message: 'The following students found!', students: student });
            }
        }
    });
}

module.exports.adminGetStudentProfile = (req, res, next) => {
    const student = req.body;
    const studentDataItemsToExclude = '-studentPassword -studentSaltSecret';
    Student.findById(student._id, studentDataItemsToExclude, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (!student) {
                return res.status(404).json({ status: false, message: 'No students found!' })
            } else {
                return res.status(200).json({ status: true, message: 'The following student found!', data: data });
            }
        }
    });
}

module.exports.adminGetMentorProfile = (req, res, next) => {
    const mentor = req.body;
    const mentorDataItemsToExclude = '-mentorPassword -mentorSaltSecret';
    Mentor.findById(mentor._id, mentorDataItemsToExclude, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (!mentor) {
                return res.status(404).json({ status: false, message: 'No mentor found!' })
            } else {
                return res.status(200).json({ status: true, message: 'The following mentor found!', data: data });
            }
        }
    });

}

module.exports.adminUpdateCourse = (req, res, next) => {
    const course = req.body;
    Course.findByIdAndUpdate(course._id, course, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ message: 'Error in updating data' })
        } else {
            console.log(doc);
            return res.status(200).json({ message: 'Data successfully updated' });
        }
    });
}

module.exports.adminUpdateMentor = (req, res, next) => {
    const mentor = req.body;
    Mentor.findByIdAndUpdate(mentor._id, { mentorStatus: mentor.mentorStatus }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ message: 'Error in updating data' })
        } else {
            console.log(doc);
            return res.status(200).json({ message: 'Data successfully updated' });
        }
    });
}

module.exports.adminUpdateStudent = (req, res, next) => {
    const student = req.body;
    Student.findByIdAndUpdate(student._id, { studentStatus: student.studentStatus }, (err, doc) => {
        if (err) {
            // console.log(err);
            return res.status(404).json({ message: 'Error in updating data' })
        } else {
            // console.log(doc);
            return res.status(200).json({ message: 'Data successfully updated' });
        }
    });
}

// * ====== mentor actions =======

// * working
module.exports.mentorAddSkill = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    mentorCourse = new MentorCourses(req.body.data);
    delete mentorCourse._id; // delete mentor's _id from here
    mentorCourse.mentorId = user._id; // add mentor's _id as mentorId

    Mentor.findById(_id, '-_id mentorFirstName mentorLastName', (err, doc) => {
        if (err) { console.log('No mentor found!'); } else {
            console.log('doc ' + JSON.stringify(doc));
            mentorCourse['mentorName'] = doc.mentorFirstName + ' ' + doc.mentorLastName;
        }
    });

    console.log(mentorCourse);

    MentorCourses.findOne({ mentorId: mentorCourse.mentorId, courseId: mentorCourse.courseId }, (err, doc) => {
        if (err) { return res.status(400).json({ message: 'Server error. Please try again later.' }) } else {
            if (doc) { return res.status(422).json({ message: 'You already have this skill. Check "My Courses".' }) } else {
                mentorCourse.save((err, result) => {
                    if (err) { return res.status(400).json({ message: 'Server error. Please try again later.' }); } else {
                        return res.status(200).json({ message: 'Skill successfully added.' });
                    }
                });
            }
        }
    })
}

// ! not implemented
module.exports.mentorUpdateSkill = (req, res, next) => {
    const mentorSkill = req.body;
    Mentor.updateOne({ '_id': mentorSkill.mentorId, 'mentorCourses.courseId': mentorSkill.courseId }, { '$set': { 'mentorCourses.$': mentorSkill } },
        (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                // do stuff
                console.log(doc)
                console.log('success');
            }
        }
    );
}

// ! not tested
module.exports.mentorGetSkillData = (req, res, next) => {
    const reqData = req.body;
    console.log(reqData);
    MentorCourses.find({ '_id': mentorSkill.mentorId, 'mentorCourses.courseId': mentorSkill.courseId },
        (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                // do stuff
                console.log(doc)
                console.log('success');
            }
        }
    );
}

// * working
module.exports.mentorGetSkills = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    MentorCourses.find({ 'mentorId': user._id }, (err, doc) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            console.log(doc);
            return res.status(200).json({ mentorCourses: doc });
        }
    })
}

module.exports.getMentorNotifications = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    CourseStudents.find({ mentorId: user._id }, (err, result) => {
        if (err) { return res.status(400).json({ message: 'Server error.' }) } else {
            if (!result) { return res.status(422).json({ message: 'No new notifications' }) } else { return res.status(200).json({ notifications: result }) }
        }
    })

}

module.exports.mentorUpdateRequestStatus = (req, res, next) => {
    const data = req.body;
    CourseStudents.findByIdAndUpdate(data._id, { courseStatus: data.courseStatus }, (err, result) => {
        if (err) { return res.status(400).json({ message: 'Server error.' }) } else {
            console.log(result);
            if (!result) { return res.status(422).json({ message: 'No data to update' }) } else {
                return res.status(200).json({ message: 'You have successfully accepted the request.' })
            }
        }
    })
}

// * ======= student actions ======= *

// * working
module.exports.getCourseMentors = (req, res, next) => {
    const course = req.body;
    MentorCourses.find({ 'courseId': course.courseId }, (err, doc) => {
        if (err) { res.status(404).json({ message: 'No mentors available for this course' }) } else {
            res.status(200).json({ courseMentors: doc })
        }
    });
}

// * working
module.exports.studentAddCourse = (req, res, next) => {
    // console.log(req.body);
    const user = JWTCheck(req.body.token);
    const courseData = req.body.data;
    delete courseData._id;
    delete courseData.courseStatus;
    courseData.studentId = user._id;
    courseData.courseTotalFee = (courseData.courseFee) * (
        1 + 0.01 * (courseData.courseCommission + courseData.courseMentorSurcharge));
    Student.findById(user._id, (err, student) => {
        if (err) { res.status(400).json({ message: 'Server error' }) } else {
            if (!student) { res.status(404).json({ message: 'You are not a valid student. Pleas login as a student to add courses.' }) } else {
                courseData.studentName = student.studentFirstName + ' ' + student.studentLastName;
                CourseStudents.findOne({ studentId: user._id, mentorId: courseData.mentorId, courseId: courseData.courseId }, (err, doc) => {
                    if (err) { return res.status(400).json({ message: 'Server Error!' }) } else {
                        if (doc) {
                            return res.status(422).json({ message: 'You have already applied for this course with the selected mentor.' })
                        } else {
                            const courseStudent = new CourseStudents(courseData);
                            courseStudent.save((err, result) => {
                                if (err) { return res.status(400).json({ message: 'Server error on saving to database!' }) } else { return res.status(200).json({ message: 'You have successfully proposed the training to mentor.' }) }
                            });
                        }
                    }
                });
            }
        }
    })
}

// * working
module.exports.studentGetMyCourses = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    CourseStudents.find({ studentId: user._id }, (err, result) => {
        if (err) { console.log(err); return res.status(400).json({ message: 'Server error' }) } else {
            console.log(result);
            if (!result) { return res.status(422).json({ message: 'You have not applied for any courses yet.' }) } else { return res.status(200).json({ studentCourses: result }) }
        }
    });
}

// * working
module.exports.getStudentNotifications = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    CourseStudents.find({ studentId: user._id }, (err, result) => {
        if (err) { return res.status(400).json({ message: 'Server error.' }) } else {
            if (!result) { return res.status(422).json({ message: 'No new notifications' }) } else { return res.status(200).json({ notifications: result }) }
        }
    })

}

// * working
module.exports.studentUpdateRequestStatus = (req, res, next) => {
    const data = req.body;
    CourseStudents.findByIdAndUpdate(data._id, { courseStatus: data.courseStatus, paymentStatus: data.paymentStatus, paymentId: data.paymentId }, (err, result) => {
        if (err) { return res.status(400).json({ message: 'Server error.' }) } else {
            console.log(result);
            if (!result) { return res.status(422).json({ message: 'No data to update' }) } else { return res.status(200).json({ message: 'You have successfully accepted the request.' }) }
        }
    })
}


// ! not implemented, not using either
module.exports.search = (req, res, next) => {
    Course.find({ courseName: new RegExp(req.body.inputSearchCourse, 'i') }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            return;
        }
    });
}


// * ======= common actions ======= *

function JWTCheck(token) {
    user = {};
    jwt.verify(token, process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                user._id = null;
                user.userType = null;
            } else {
                user._id = decoded._id;
                user.userType = decoded.userType;
            }
        }
    )
    return user;
}