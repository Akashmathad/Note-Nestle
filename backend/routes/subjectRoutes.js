const express = require('express');
const subjectController = require('./../controllers/subjectController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.verifyToken, subjectController.getSubjects);

router.route('/createSubject').post(subjectController.createSubject);

router.route('/createUnit/:subjectId').post(subjectController.createUnit);

router
  .route('/upload/:subjectId/:unitId')
  .post(subjectController.uploadFiles, subjectController.handleFileUpload);

router.route('/file/:subjectId/:unitId/:fileId').get(subjectController.getFile);

router
  .route('/deleteFiles/:subjectId/:unitId')
  .delete(subjectController.deleteFiles);

router
  .route('/deleteUnit/:subjectId/:unitId')
  .delete(subjectController.deleteUnit);

router
  .route('/deleteSubject/:subjectId')
  .delete(subjectController.deleteSubject);

router.route('/addSubjectToArray').post(subjectController.addSubjectToArray);
router
  .route('/deleteSubjectToArray')
  .post(subjectController.deleteSubjectToArray);

module.exports = router;
