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
  },
  teacherAccess: {
    type: Boolean,
    default: false,
  },
  adminAccess: {
    type: Boolean,
    default: false,
  },
  subjects: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr) {
        // Check if there are no duplicate elements within the same array
        return new Set(arr).size === arr.length;
      },
      message: 'Subject is already assigned to you',
    },
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
