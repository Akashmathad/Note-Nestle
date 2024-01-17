const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get((req, res) => res.send('hello student'));

router.route('/addStudent').post(authController.addStudent);
router
  .route('/addStudents')
  .post(authController.uploadExcel, authController.uploadStudents);
router.route('/login').post(authController.studentLogin);

router.route('/deleteStudent').post(authController.deleteStudent);

router
  .route('/deleteStudents')
  .post(authController.uploadExcel, authController.deleteStudents);

module.exports = router;
