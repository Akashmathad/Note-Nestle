const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Student = require('./../models/studentModel');
const xlsx = require('xlsx');
const multer = require('multer');
const jwt = require('jsonwebtoken');

exports.verifyToken = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;

  const actualToken = token.split(' ')[1];

  if (!actualToken) {
    return next(
      new AppError('You are not logged in! Please refresh to log in', 401)
    );
  }

  jwt.verify(actualToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new AppError('You are not logged in! Please refresh to log in', 401)
      );
    }

    req.user = decoded;

    next();
  });
});

exports.verifyTokenExpire = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

exports.studentLogin = catchAsync(async (req, res, next) => {
  const { collegeId, password } = req.body;

  const user = await Student.findOne({ collegeId }).select('+password');

  if (!user || user.password !== password) {
    return next(new AppError('Incorrect college Id or password', 401));
  }

  const token = jwt.sign(
    { collegeId: user.collegeId },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      name: user.name,
      collegeId: user.collegeId,
      teacherAccess: user.teacherAccess,
      adminAccess: user.adminAccess,
    },
    token,
  });
});

exports.addStudent = catchAsync(async (req, res, next) => {
  const user = await Student.create(req.body);

  return res.status(200).json({
    status: 'success',
    data: {
      name: user.name,
      collegeId: user.collegeId,
      teacherAccess: user.teacherAccess,
      adminAccess: user.adminAccess,
    },
  });
});

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadExcel = upload.single('excelFile');

exports.uploadStudents = catchAsync(async (req, res, next) => {
  const teacherAccess =
    req.body.teacherAccess !== undefined ? req.body.teacherAccess : false;

  if (!req.file) {
    return next(new AppError('file not found', 404));
  }

  // Parse the Excel file from buffer
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Create student records
  for (const record of excelData) {
    const { name, collegeId, password } = record;
    await Student.create({
      name,
      collegeId,
      password,
      teacherAccess,
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Student records created successfully',
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const collegeId = req.body.collegeId;
  await Student.findOneAndDelete({ collegeId });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteStudents = catchAsync(async (req, res, next) => {
  const teacherAccess =
    req.body.teacherAccess !== undefined ? req.body.teacherAccess : false;

  if (!req.file) {
    return next(new AppError('file not found', 404));
  }

  // Parse the Excel file from buffer
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Create student records
  for (const record of excelData) {
    const { collegeId } = record;
    await Student.findOneAndDelete({ collegeId });
  }

  res.status(204).json({
    status: 'success',
    message: 'Student records deleted successfully',
  });
});
