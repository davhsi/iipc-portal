const express = require('express');
const router = express.Router();
const facultyVisitController = require('../controllers/facultyVisitController');

// Define routes for faculty visits
router.post('/', facultyVisitController.createFacultyVisit); // Create a new visit
router.get('/', facultyVisitController.getAllFacultyVisits); // Get all visits
router.get('/:id', facultyVisitController.getFacultyVisitById); // Get a visit by ID
router.put('/:id', facultyVisitController.updateFacultyVisit); // Update a visit by ID
router.delete('/:id', facultyVisitController.deleteFacultyVisit); // Delete a visit by ID

module.exports = router;
