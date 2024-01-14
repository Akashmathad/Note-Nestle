const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get((req, res) => res.send('hello student'));

router.route('/addStudent').post(authController.addStudent);
router
  .route('/addStudents')
  .post(authController.uploadExcel, authController.uploadStudents);
router.route('/login').post(authController.studentLogin);

module.exports = router;
