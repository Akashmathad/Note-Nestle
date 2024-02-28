const express = require('express');
const subjectController = require('./../controllers/subjectController');
const authController = require('./../controllers/authController');

const router = express.Router();

// get all subjects
router
  .route('/')
  .get(authController.verifyToken, subjectController.getSubjects);

//create subject
router.route('/createSubject').post(subjectController.createSubject);

//create unit
router.route('/createUnit/:subjectId').post(subjectController.createUnit);

//upload file to unit
router
  .route('/upload/:subjectId/:unitId')
  .post(subjectController.uploadFiles, subjectController.handleFileUpload);

//download particular file
router
  .route('/file/:subjectId/:unitId/:fileId')
  .get(authController.verifyToken, subjectController.getFile);

//view a particular file
router
  .route('/viewFile/:subjectId/:unitId/:fileId')
  .get(subjectController.viewFile);

//delete single or multiple files from particular unit
router
  .route('/deleteFiles/:subjectId/:unitId')
  .delete(subjectController.deleteFiles);

//delete full unit
router
  .route('/deleteUnit/:subjectId/:unitId')
  .delete(subjectController.deleteUnit);

// delete full subject
router
  .route('/deleteSubject/:subjectId')
  .delete(subjectController.deleteSubject);
// feedback routes

router
  .route('/feedbacks')
  .post(subjectController.addFeedback)
  .get(subjectController.getFeedbacks);

router.route('/feedbacks/:feedbackId').delete(subjectController.deleteFeedback);

//stats
router.route('/stats').get(subjectController.getStats);

module.exports = router;
