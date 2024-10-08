const express = require('express');
const router = express.Router();
const industryExpertController = require('../controllers/industryExpertController');

// Route to get all Industry Experts with filtering via query parameters
router.get('/experts', industryExpertController.getIndustryExperts);

// Route to add a new Industry Expert
router.post('/experts', industryExpertController.addIndustryExpert);

// Route to get a single Industry Expert by ID
router.get('/experts/:id', industryExpertController.getIndustryExpertById);

// Route to update an existing Industry Expert
router.put('/experts/:id', industryExpertController.updateIndustryExpert);

// Route to delete an Industry Expert
router.delete('/experts/:id', industryExpertController.deleteIndustryExpert);

// Route to fetch all unique domains
router.get('/domains', industryExpertController.getUniqueDomains);

// Route to fetch all unique locations
router.get('/locations', industryExpertController.getUniqueLocations);

// Route to fetch all unique event types
router.get('/event-types', industryExpertController.getUniqueEventTypes);

// Route to fetch all unique star ratings
router.get('/star-ratings', industryExpertController.getUniqueStarRatings);

module.exports = router;
