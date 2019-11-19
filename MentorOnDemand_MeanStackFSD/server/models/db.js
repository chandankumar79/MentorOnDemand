const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI_Local, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (!err) { console.log('MongoDB connection succeeded.'); } else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
    });

require('./user.model');
require('./student.model');
require('./mentor.model');
require('./admin.model');
require('./course.model');
require('./mentorCourses.model');
require('./courseStudents.model');