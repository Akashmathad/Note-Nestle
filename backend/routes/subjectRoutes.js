const express = require('express');
const subjectController = require('./../controllers/subjectController');

const router = express.Router();

router.route('/').get(subjectController.getSubjects);

router.route('/createSubject').post(subjectController.createSubject);

router.route('/createUnit/:subjectId').post(subjectController.createUnit);

router
  .route('/upload/:subjectId/:unitId')
  .post(subjectController.uploadFiles, subjectController.handleFileUpload);

router.route('/file/:subjectId/:unitId/:fileId').get(subjectController.getFile);

module.exports = router;
