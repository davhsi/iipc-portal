const express = require('express');
const router = express.Router();
const industryExpertController = require('../controllers/industryExpertController');

router.post('/experts', industryExpertController.addIndustryExpert);
router.get('/experts', industryExpertController.getIndustryExperts);
router.get('/experts/:id', industryExpertController.getIndustryExpertById);
router.put('/experts/:id', industryExpertController.updateIndustryExpert); 

module.exports = router;
