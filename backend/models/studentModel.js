const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collegeId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  teacherAccess: {
    type: Boolean,
    default: false,
  },
  adminAccess: {
    type: Boolean,
    default: false,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
