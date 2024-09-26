const express = require('express');
const router = express.Router();
const facultyVisitController = require('../controllers/facultyVisitController');

// Routes for faculty visits
router.post('/new', facultyVisitController.createFacultyVisit);
router.put('/:id', facultyVisitController.updateFacultyVisit);
router.get('/', facultyVisitController.getAllFacultyVisits);
router.get('/event-locations', facultyVisitController.getUniqueEventLocations);
router.get('/event-types', facultyVisitController.getUniqueEventTypes);
router.delete('/:id', facultyVisitController.deleteFacultyVisit);
router.post('/', facultyVisitController.fetchFacultyVisits);
router.get('/:id', facultyVisitController.getFacultyVisitById);

module.exports = router;
