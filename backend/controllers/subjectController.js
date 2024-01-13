const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Subject = require('./../models/subjectModel');

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
