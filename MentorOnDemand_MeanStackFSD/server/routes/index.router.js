const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlData = require('../controllers/data.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate/student', ctrlUser.authenticateStudent);
router.post('/authenticate/mentor', ctrlUser.authenticateMentor);
router.post('/authenticate/admin', ctrlUser.authenticateAdmin);
// TODO: do implement jwt token verification in case of login and profile acccess
// router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile); 
router.post('/userProfile', ctrlUser.userProfile);
router.post('/userProfileUpdate', ctrlUser.updateUserProfile);


router.post('/add/tech', ctrlData.addTech);
router.post('/admin/updateCourse', ctrlData.adminUpdateCourse);
router.post('/admin/updateMentor', ctrlData.adminUpdateMentor);
router.post('/admin/updateStudent', ctrlData.adminUpdateStudent);
router.post('/admin/getStudentProfile', ctrlData.adminGetStudentProfile);
router.post('/admin/getMentorProfile', ctrlData.adminGetMentorProfile);

router.get('/courses', ctrlData.allCourses);
router.get('/admin/getCourses', ctrlData.allCourses);
router.get('/admin/getMentors', ctrlData.adminGetMentors);
router.get('/admin/getStudents', ctrlData.adminGetStudents);


router.post('/mentor/addSkill', ctrlData.mentorAddSkill);
router.post('/mentor/getSkills', ctrlData.mentorGetSkills);
router.post('/mentor/getMentorNotifications', ctrlData.getMentorNotifications);
router.post('/mentor/updateRequestStatus', ctrlData.mentorUpdateRequestStatus);


router.post('/getCourseMentors', ctrlData.getCourseMentors);
router.post('/student/addCourse', ctrlData.studentAddCourse);
router.post('/student/getMyCourses', ctrlData.studentGetMyCourses);
router.post('/student/getStudentNotifications', ctrlData.getStudentNotifications);
router.post('/student/updateRequestStatus', ctrlData.studentUpdateRequestStatus);

router.get('/search', ctrlData.search);

module.exports = router;