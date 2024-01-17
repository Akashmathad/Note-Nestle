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
    return res.status(401).json({
      status: 'fail',
      message: 'Please loggin in to get access',
    });
  }

  jwt.verify(actualToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please loggin in to get access',
      });
    }

    req.user = decoded;

    next();
  });
});

exports.studentLogin = catchAsync(async (req, res, next) => {
  const { collegeId, password } = req.body;

  const user = await Student.findOne({ collegeId }).select('+password');
  console.log(user);

  if (!user || user.password !== password) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid username or password',
    });
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
    return res
      .status(400)
      .json({ status: 'fail', message: 'No file uploaded' });
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
