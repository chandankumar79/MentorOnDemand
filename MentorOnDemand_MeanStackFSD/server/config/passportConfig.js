const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Student = mongoose.model('Student');
var Mentor = mongoose.model('Mentor');
var Admin = mongoose.model('Admin')

passport.use('studentLocal', new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
        Student.findOne({ studentEmail: username }, (err, user) => {
            if (err)
                return done(err);
            // unknown user
            else if (!user)
                return done(null, false, { message: 'Student is not registered' });
            // wrong password
            else if (!user.verifyPassword(password))
                return done(null, false, { message: 'Incorrect username or password.' });
            // authentication succeeded
            else
                return done(null, user);
        });
    }
));

passport.use('mentorLocal', new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
        Mentor.findOne({ mentorEmail: username },
            (err, user) => {
                if (err)
                    return done(err);
                // unknown user
                else if (!user)
                    return done(null, false, { message: 'Mentor is not registered' });
                // wrong password
                else if (!user.verifyPassword(password))
                    return done(null, false, { message: 'Incorrect username or password.' });
                // authentication succeeded
                else
                    return done(null, user);
            }
        );
    }
));

passport.use('adminLocal', new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
        Admin.findOne({ adminEmail: username },
            (err, user) => {
                if (err)
                    return done(err);
                // unknown user
                else if (!user)
                    return done(null, false, { message: 'Admin is not registered' });
                // wrong password
                else if (!user.verifyPassword(password))
                    return done(null, false, { message: 'Incorrect username or password.' });
                // authentication succeeded
                else
                    return done(null, user);
            }
        );
    }
));