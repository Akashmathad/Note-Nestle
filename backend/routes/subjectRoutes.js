const express = require('express');
const subjectController = require('./../controllers/subjectController');

const router = express.Router();

router.route('/').get(subjectController.getSubjects);

router.route('/createSubject').post(subjectController.createSubject);

router.route('/createUnit/:subjectId').post(subjectController.createUnit);

module.exports = router;
