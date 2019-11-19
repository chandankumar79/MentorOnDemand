const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Student = mongoose.model('Student');
const Mentor = mongoose.model('Mentor');
const Admin = mongoose.model('Admin');

// * working
module.exports.register = (req, res, next) => {
    let userData = req.body;
    if (userData.userType == 'admin') {
        console.log('register admin executed');
        let user = new Admin();
        user.adminFirstName = userData.firstName;
        user.adminLastName = userData.lastName;
        user.adminEmail = userData.email;
        user.adminPassword = userData.password;
        user.adminDOB = userData.dob;
        user.adminSex = userData.sex;
        user.adminContactNumber = userData.contactNumber;
        user.save((err, doc) => {
            if (!err) res.send(doc);
            else {
                if (err.code == 11000) res.status(422).send(['Email address is already registered.']);
                else return next(err);
            }
        });
    } else if (userData.userType == 'mentor') {
        let user = new Mentor();
        user.mentorFirstName = userData.firstName;
        user.mentorLastName = userData.lastName;
        user.mentorEmail = userData.email;
        user.mentorPassword = userData.password;
        user.mentorDOB = userData.dob;
        user.mentorSex = userData.sex;
        user.mentorContactNumber = userData.contactNumber;
        user.mentorLinkedInProfile = userData.linkedInProfile;
        user.save((err, doc) => {
            if (!err) {
                console.log('Mentor save Successful!');
                res.send(doc);
            } else {
                if (err.code == 11000) {
                    res.status(422).send(['Email address is already registered.']);
                } else {
                    return next(err)
                };
            }
        });
    } else if (userData.userType == 'student') {
        let user = new Student();
        user.studentFirstName = userData.firstName;
        user.studentLastName = userData.lastName;
        user.studentEmail = userData.email;
        user.studentPassword = userData.password;
        user.studentDOB = userData.dob;
        user.studentSex = userData.sex;
        user.studentContactNumber = userData.contactNumber;
        user.studentLinkedInProfile = userData.linkedInProfile;
        user.save((err, doc) => {
            if (!err) res.send(doc);
            else {
                if (err.code == 11000) res.status(422).send(['Email address is already registered.']);
                else return next(err);
            }
        });
    } else {
        console.log('Invalid user registration processed!')
    }
}

// * working
module.exports.authenticateStudent = module.exports.authenticate = (req, res, next) => {
    passport.authenticate('studentLocal', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ 'token': user.generateJwt(), 'userType': 'student' });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// * working
module.exports.authenticateMentor = module.exports.authenticate = (req, res, next) => {
    passport.authenticate('mentorLocal', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ 'token': user.generateJwt(), 'userType': 'mentor' });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// * working
module.exports.authenticateAdmin = module.exports.authenticate = (req, res, next) => {
    passport.authenticate('adminLocal', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ 'token': user.generateJwt(), 'userType': 'admin' });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// * working
module.exports.userProfile = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    switch (user.userType) {
        case 'student':
            Student.findOne({ _id: user._id }, '-studentPassword -studentSaltSecret', (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: 'User record not found.' });
                else
                    return res.status(200).json({ status: true, user: user });
            });
            break;
        case 'mentor':
            Mentor.findOne({ _id: user._id }, '-mentorPassword -mentorSaltSecret', (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: 'User record not found.' });
                else
                    return res.status(200).json({ status: true, user: user });
            });
            break;
        case 'admin':
            Admin.findOne({ _id: user._id }, '-adminPassword -adminSaltSecret', (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: 'User record not found.' });
                else
                    return res.status(200).json({ status: true, user: user });
            });
            break;
        default:
            console.log('*** No Profile Case | Invalid user type ***');
            break;
    }
}

// * working
module.exports.updateUserProfile = (req, res, next) => {
    const user = JWTCheck(req.body.token);
    const data = req.body.data;

    switch (user.userType) {
        case 'mentor':
            {
                const dataToUpdate = {};
                dataToUpdate.mentorFirstName = data.firstName;
                dataToUpdate.mentorLastName = data.lastName;
                dataToUpdate.mentorContactNumber = data.contactNumber;
                dataToUpdate.mentorLinkedInProfile = data.linkedInProfile;
                dataToUpdate.mentorDOB = data.dob;
                Mentor.findByIdAndUpdate(user._id, dataToUpdate, (err, mentor) => {
                    if (err) { res.status(400).json({ message: 'Mentor not found.' }); } else { res.status(400).json({ message: 'Data updated successfully.' }) }
                });
                break;
            }
        case 'student':
            {
                const dataToUpdate = {};
                dataToUpdate.studentFirstName = data.firstName;
                dataToUpdate.studentLastName = data.lastName;
                dataToUpdate.studentContactNumber = data.contactNumber;
                dataToUpdate.studentLinkedInProfile = data.linkedInProfile;
                dataToUpdate.studentDOB = data.dob;
                Student.findByIdAndUpdate(user._id, dataToUpdate, (err, student) => {
                    if (err) { res.status(400).json({ message: 'Student not found.' }); } else { res.status(400).json({ message: 'Data updated successfully.' }) }
                });
                break;
            }
        case 'admin':
            {
                const dataToUpdate = {};
                dataToUpdate.adminFirstName = data.firstName;
                dataToUpdate.adminLastName = data.lastName;
                dataToUpdate.adminContactNumber = data.contactNumber;
                dataToUpdate.adminLinkedInProfile = data.linkedInProfile;
                dataToUpdate.adminDOB = data.dob;
                Admin.findByIdAndUpdate(user._id, dataToUpdate, (err, admin) => {
                    if (err) { res.status(400).json({ message: 'Admin not found.' }); } else { res.status(400).json({ message: 'Data updated successfully.' }) }
                });
                break;
            }
    }
}

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