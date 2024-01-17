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
        // Check if there are no duplicate elements in the array
        return new Set(arr).size === arr.length;
      },
      message: 'Subjects array must have unique elements.',
    },
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
