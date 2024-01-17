const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Subject = require('./../models/subjectModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const Student = require('../models/studentModel');

exports.getSubjects = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Subject.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const subjects = await features.query;

  res.status(200).json({
    status: 'success',
    data: subjects,
  });
});

exports.createSubject = catchAsync(async (req, res, next) => {
  const newSubject = await Subject.create(req.body);

  res.status(201).json({
    status: 'success',
    subject: newSubject,
  });
});

exports.createUnit = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;

  const subject = await Subject.findById(subjectId);

  if (!subject) {
    return res.status(404).json({
      status: fail,
      message: 'Subject not found',
    });
  }

  subject.units.push(req.body);
  await subject.save();

  res.status(200).json({
    status: 'success',
    subject,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.uploadFiles = upload.single('file');

exports.handleFileUpload = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return res.status(404).json({ message: 'Unit not found' });
  }

  // Ensure that req.file is available before accessing its properties
  if (!req.file) {
    return res.status(400).json({ message: 'file not provided' });
  }

  const newFile = {
    title: req.body.title,
    ownerName: req.body.ownerName,
    fileUrl: req.file.path,
  };

  unit.files.push(newFile);
  await subject.save();

  res.status(201).json(subject);
});

exports.getFile = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;
  const fileId = req.params.fileId;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return res.status(404).json({ message: 'Unit not found' });
  }

  const file = unit.files.id(fileId);
  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }

  const filePath = path.join(__dirname, '..', file.fileUrl);

  const mimeType = mime.lookup(filePath) || 'application/octet-stream';

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${file.title}.${mime.extension(mimeType)}"`
  );
  res.setHeader('Content-Type', mimeType);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

exports.deleteFiles = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;

  const deleteFiles = req.body.fileIds;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return res.status(404).json({ message: 'Unit not found' });
  }

  for (const fileId of deleteFiles) {
    const file = unit.files.id(fileId);
    if (file) {
      const filePath = path.join(__dirname, '..', file.fileUrl);
      await fs.promises.unlink(filePath);
      unit.files.pull(fileId);
    }
  }
  await subject.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteUnit = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return res.status(404).json({ message: 'Unit not found' });
  }

  for (const file of unit.files) {
    const filePath = path.join(__dirname, '..', file.fileUrl);
    await fs.promises.unlink(filePath);
  }

  subject.units.pull(unitId);

  await subject.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteSubject = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  for (const unit of subject.units) {
    for (const file of unit.files) {
      const filePath = path.join(__dirname, '..', file.fileUrl);
      await fs.promises.unlink(filePath);
    }
  }

  subject.units = [];

  await subject.save();

  await Subject.findByIdAndDelete(subjectId);

  res.status(204).json({ status: 'success', data: null });
});

exports.addSubjectToArray = catchAsync(async (req, res, next) => {
  const collegeId = req.body.collegeId;

  const student = await Student.findOne({ collegeId });

  student.subjects.push(req.body.subject);

  await student.save();

  res.status(201).json({ status: 'success', data: student });
});

exports.deleteSubjectToArray = catchAsync(async (req, res, next) => {
  const collegeId = req.body.collegeId;

  const student = await Student.findOne({ collegeId });

  student.subjects = student.subjects.filter(
    (subject) => subject !== req.body.subject
  );

  await student.save();

  res.status(201).json({ status: 'success', data: student });
});
