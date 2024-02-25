const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  webViewLink: {
    type: String,
  },
});

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  files: [pdfSchema],
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  units: [unitSchema],
});

// Ensure that a subject name is unique within the same branch
subjectSchema.index({ name: 1, branch: 1 }, { unique: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
