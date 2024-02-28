const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const Subject = require('./../models/subjectModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const Student = require('../models/studentModel');
const { google } = require('googleapis');
const { Readable } = require('stream');
const Feedback = require('../models/feedbackModel');
const credentials = require('./../utils/note-nestle-43cc52cdcb88.json');

exports.getSubjects = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Subject.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const subjects = await features.query;

  res.status(200).json({
    status: 'success',
    length: subjects.length,
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
    return next(new AppError('Subject not found', 404));
  }

  subject.units.push(req.body);
  await subject.save();

  res.status(200).json({
    status: 'success',
    subject,
  });
});

const storage = multer.memoryStorage(); // Use in-memory storage for file upload
const upload = multer({ storage: storage });

// Directly set service account credentials
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth: auth });

exports.uploadFiles = upload.single('file');

exports.handleFileUpload = catchAsync(async (req, res, next) => {
  const { subjectId, unitId } = req.params;

  try {
    // Find subject and unit
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return next(new AppError('Subject not found', 404));
    }

    const unit = subject.units.id(unitId);
    if (!unit) {
      return next(new AppError('Unit not found', 404));
    }

    // Ensure that req.file is available before accessing its properties
    if (!req.file) {
      return next(new AppError('File not found', 404));
    }

    // Prepare file metadata
    const fileMetadata = {
      name:
        req.body.title +
        '-' +
        unit.name +
        '-' +
        subject.name +
        path.extname(req.file.originalname),
      parents: ['1uMvB9UwZLYsqITNa_dS2OkolCnfYjWVn'],
    };

    // Prepare media for Google Drive
    const media = {
      mimeType: req.file.mimetype,
      body: Readable.from(req.file.buffer),
    };

    // Upload file to Google Drive
    const uploadedFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    const { id, webViewLink, webContentLink } = uploadedFile.data;
    if (!id || !webViewLink || !webContentLink) {
      return next(
        new AppError(
          'Unable to retrieve webViewLink from Google Drive response',
          500
        )
      );
    }

    // Save file information to MongoDB
    const newFile = {
      title: req.body.title,
      ownerName: req.body.ownerName,
      fileUrl: uploadedFile.data.id,
      webViewLink,
      webContentLink,
    };

    unit.files.push(newFile);
    await subject.save();

    res.status(201).json(subject);
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error.message);
    console.error('Google Drive API Error:', error); // Log the detailed errors
    return next(new AppError('Error uploading file to Google Drive', 500));
  }
});

exports.getFile = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;
  const fileId = req.params.fileId;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return next(new AppError('Subject not found', 404));
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return next(new AppError('Unit not found', 404));
  }

  const file = unit.files.id(fileId);
  if (!file) {
    return next(new AppError('File not found', 404));
  }

  res.status(200).json({ status: 'success', link: file.webContentLink });
});

exports.viewFile = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;
  const fileId = req.params.fileId;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return next(new AppError('Subject not found', 404));
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return next(new AppError('Unit not found', 404));
  }

  const file = unit.files.id(fileId);
  if (!file) {
    return next(new AppError('File not found', 404));
  }

  res.status(200).json({ status: 'success', link: file.webViewLink });
});

exports.deleteFiles = catchAsync(async (req, res, next) => {
  const subjectId = req.params.subjectId;
  const unitId = req.params.unitId;

  const deleteFiles = req.body.fileIds;

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    return next(new AppError('Subject not found', 404));
  }
  const unit = subject.units.id(unitId);
  if (!unit) {
    return next(new AppError('Unit not found', 404));
  }

  for (const fileId of deleteFiles) {
    const file = unit.files.id(fileId);
    if (file) {
      try {
        // Use the Google Drive API to delete the file
        await drive.files.delete({
          fileId: file.fileUrl,
        });
      } catch (error) {
        console.error('Error deleting file from Google Drive:', error);
        return next(new AppError('Error deleting file from Google Drive', 500));
      }

      // Remove file from MongoDB
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
    return next(new AppError('Subject not found', 404));
  }

  const unit = subject.units.id(unitId);
  if (!unit) {
    return next(new AppError('Unit not found', 404));
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
    return next(new AppError('Subject not found', 404));
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

//feedback controllers

exports.getFeedbacks = catchAsync(async (req, res, next) => {
  const feedbacks = await Feedback.find();

  res.status(200).json({
    status: 'success',
    length: feedbacks.length,
    data: feedbacks,
  });
});

exports.addFeedback = catchAsync(async (req, res, next) => {
  const feedback = await Feedback.create(req.body);

  res.status(201).json({
    status: 'success',
    data: feedback,
  });
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const feedbackId = req.params.feedbackId;

  await Feedback.findByIdAndDelete(feedbackId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// get stats

exports.getStats = catchAsync(async (req, res, next) => {
  const studentCount = await Student.countDocuments({ teacherAccess: false });
  const teacherCount = await Student.countDocuments({ teacherAccess: true });
  const subjectCount = await Subject.countDocuments();

  // Count the number of PDFs across all subjects and units
  const pdfCount = await Subject.aggregate([
    { $unwind: '$units' },
    { $unwind: '$units.files' },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      studentCount,
      teacherCount,
      subjectCount,
      pdfCount: pdfCount.length > 0 ? pdfCount[0].count : 0,
    },
  });
});

// exports.getFile = catchAsync(async (req, res, next) => {
//   const subjectId = req.params.subjectId;
//   const unitId = req.params.unitId;
//   const fileId = req.params.fileId;

//   const subject = await Subject.findById(subjectId);
//   if (!subject) {
//     return next(new AppError('Subject not found', 404));
//   }

//   const unit = subject.units.id(unitId);
//   if (!unit) {
//     return next(new AppError('Unit not found', 404));
//   }

//   const file = unit.files.id(fileId);
//   if (!file) {
//     return next(new AppError('file not found', 404));
//   }

//   const filePath = path.join(__dirname, '..', file.fileUrl);

//   const mimeType = mime.lookup(filePath) || 'application/octet-stream';

//   res.setHeader(
//     'Content-Disposition',
//     `attachment; filename="${file.title}.${mime.extension(mimeType)}"`
//   );
//   res.setHeader('Content-Type', mimeType);

//   const fileStream = fs.createReadStream(filePath);
//   fileStream.pipe(res);
// });

// exports.getFile = catchAsync(async (req, res, next) => {
//   const subjectId = req.params.subjectId;
//   const unitId = req.params.unitId;
//   const fileId = req.params.fileId;

//   const subject = await Subject.findById(subjectId);
//   if (!subject) {
//     return next(new AppError('Subject not found', 404));
//   }

//   const unit = subject.units.id(unitId);
//   if (!unit) {
//     return next(new AppError('Unit not found', 404));
//   }

//   const file = unit.files.id(fileId);
//   if (!file) {
//     return next(new AppError('file not found', 404));
//   }

//   // Use the Google Drive API to get file information
//   const fileMetadata = await drive.files.get({
//     fileId: file.fileUrl,
//     fields: 'id, name, mimeType, parents, webViewLink', // Add any additional fields you need
//   });

//   const mimeType = fileMetadata.data.mimeType;
//   const fileName = file.title;

//   // Validate if the file has the correct parent folder (optional)
//   // Add additional checks if necessary

//   // Set content headers for the response
//   res.setHeader(
//     'Content-Disposition',
//     `attachment; filename="${fileName}.${mime.extension(mimeType)}"`
//   );
//   res.setHeader('Content-Type', mimeType);

//   // Use the Google Drive API to download the file content
//   const fileStream = await drive.files.get(
//     { fileId: file.fileUrl, alt: 'media' },
//     { responseType: 'stream' }
//   );

//   // Pipe the file stream to the response
//   fileStream.data
//     .on('end', () => {
//       console.log('File download complete.');
//     })
//     .on('error', (err) => {
//       console.error('Error downloading file:', err);
//       return next(new AppError('Error downloading file', 500));
//     })
//     .pipe(res);
// });

//upload files to google drive

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// exports.uploadFiles = upload.single('file');

// exports.handleFileUpload = catchAsync(async (req, res, next) => {
//   const subjectId = req.params.subjectId;
//   const unitId = req.params.unitId;

//   const subject = await Subject.findById(subjectId);
//   if (!subject) {
//     return next(new AppError('Subject not found', 404));
//   }

//   const unit = subject.units.id(unitId);
//   if (!unit) {
//     return next(new AppError('Unit not found', 404));
//   }

//   // Ensure that req.file is available before accessing its properties
//   if (!req.file) {
//     return next(new AppError('File not found', 404));
//   }

//   const newFile = {
//     title: req.body.title,
//     ownerName: req.body.ownerName,
//     fileUrl: req.file.path,
//   };

//   unit.files.push(newFile);
//   await subject.save();

//   res.status(201).json(subject);
// });

// exports.deleteFiles = catchAsync(async (req, res, next) => {
//   const subjectId = req.params.subjectId;
//   const unitId = req.params.unitId;

//   const deleteFiles = req.body.fileIds;

//   const subject = await Subject.findById(subjectId);
//   if (!subject) {
//     return next(new AppError('Subject not found', 404));
//   }
//   const unit = subject.units.id(unitId);
//   if (!unit) {
//     return next(new AppError('Unit not found', 404));
//   }
//   for (const fileId of deleteFiles) {
//     const file = unit.files.id(fileId);
//     if (file) {
//       const filePath = path.join(__dirname, '..', file.fileUrl);
//       await fs.promises.unlink(filePath);
//       unit.files.pull(fileId);
//     }
//   }
//   await subject.save();

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
