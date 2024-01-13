const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Subject = require('./../models/subjectModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

exports.getSubjects = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello world!',
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

exports.uploadFiles = upload.single('file'); // Add the multer middleware here

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

  // Create a new PDF document using the Mongoose model
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

  // Assuming 'uploads' is the directory where you store your files
  const filePath = path.join(__dirname, '..', file.fileUrl);

  // Determine the MIME type based on the file extension
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';

  // Set the appropriate headers for file download
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${file.title}.${mime.extension(mimeType)}"`
  );
  res.setHeader('Content-Type', mimeType);

  // Create a read stream from the file and pipe it to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});
