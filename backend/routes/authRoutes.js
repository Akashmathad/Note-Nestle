const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.verifyToken, authController.verifyTokenExpire);

//add single student
router.route('/addStudent').post(authController.addStudent);

//add students via excel
router
  .route('/addStudents')
  .post(authController.uploadExcel, authController.uploadStudents);
router.route('/login').post(authController.studentLogin);

//delete single student
router.route('/deleteStudent').post(authController.deleteStudent);

//delete students via excel
router
  .route('/deleteStudents')
  .post(authController.uploadExcel, authController.deleteStudents);

module.exports = router;
