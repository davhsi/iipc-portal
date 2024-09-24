const express = require('express');
const router = express.Router();
const industryExpertController = require('../controllers/industryExpertController');

// Add routes for domains and locations
router.get('/domains', industryExpertController.getDomains);
router.get('/locations', industryExpertController.getLocations);

// Routes for Industry Experts
router.post('/experts', industryExpertController.addIndustryExpert); // Create expert
router.get('/experts', industryExpertController.getIndustryExperts); // Get all experts
router.get('/experts/:id', industryExpertController.getIndustryExpertById); // Get expert by ID
router.put('/experts/:id', industryExpertController.updateIndustryExpert); // Update expert by ID
router.delete('/experts/:id', industryExpertController.deleteIndustryExpert); // Delete expert by ID

module.exports = router;
