const IndustryExpert = require('../models/IndustryExpert');

// Add a new Industry Expert
exports.addIndustryExpert = async (req, res) => {
  try {
    const expert = new IndustryExpert(req.body);
    await expert.save();
    res.status(201).json(expert);  // Return the newly added expert
  } catch (error) {
    console.error('Error adding Industry Expert:', error);
    res.status(400).json({ message: 'Error adding Industry Expert', error: error.message });
  }
};

// Get all Industry Experts with search, sort, domain, location, and date filtering
exports.getIndustryExperts = async (req, res) => {
  try {
    const { search, sortField = 'eventDate', sortOrder = 'asc', startDate, endDate, domain, location } = req.query;

    // Initialize query object
    let query = {};
    
    // Full-text search (assumes text index on relevant fields)
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by domain
    if (domain) {
      query.domainOfExpertise = domain;
    }
    
    // Filter by location
    if (location) {
      query.companyAddress = location;
    }
    
    // Filter by event date range
    if (startDate && endDate) {
      query.eventDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Define sorting options based on query parameters
    const sortOptions = {};
    if (sortField) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1; // Ascending or descending based on sortOrder
    }

    // Fetch the experts using the constructed query and sort options
    const experts = await IndustryExpert.find(query).sort(sortOptions);
    
    // Return the experts in the response
    res.status(200).json(experts);
  } catch (error) {
    console.error('Error fetching Industry Experts:', error);
    res.status(500).json({ message: 'Error fetching Industry Experts', error: error.message });
  }
};

// Get a single Industry Expert by ID
exports.getIndustryExpertById = async (req, res) => {
  try {
    const expert = await IndustryExpert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: 'Industry Expert not found' });
    }

    res.status(200).json(expert); // Return the found expert
  } catch (error) {
    console.error('Error fetching Industry Expert by ID:', error);
    res.status(500).json({ message: 'Error fetching Industry Expert', error: error.message });
  }
};

// Update an existing Industry Expert
exports.updateIndustryExpert = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the expert by ID and update with new data
    const updatedExpert = await IndustryExpert.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document after the update
      runValidators: true, // Ensure updated data adheres to model validation rules
    });

    if (!updatedExpert) {
      return res.status(404).json({ message: 'Industry Expert not found' });
    }

    res.status(200).json(updatedExpert); // Return the updated expert
  } catch (error) {
    console.error('Error updating Industry Expert:', error);
    res.status(400).json({ message: 'Error updating Industry Expert', error: error.message });
  }
};

// Delete an Industry Expert (if required)
exports.deleteIndustryExpert = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the expert by ID
    const deletedExpert = await IndustryExpert.findByIdAndDelete(id);

    if (!deletedExpert) {
      return res.status(404).json({ message: 'Industry Expert not found' });
    }

    res.status(200).json({ message: 'Industry Expert deleted successfully' });
  } catch (error) {
    console.error('Error deleting Industry Expert:', error);
    res.status(500).json({ message: 'Error deleting Industry Expert', error: error.message });
  }
};

// Fetch all unique domains from Industry Experts
exports.getDomains = async (req, res) => {
  try {
    const domains = await IndustryExpert.distinct('domainOfExpertise'); // Get unique domains
    res.status(200).json(domains); // Return the list of unique domains
  } catch (error) {
    console.error('Error fetching domains:', error);
    res.status(500).json({ message: 'Error fetching domains', error: error.message });
  }
};

// Fetch all unique locations from Industry Experts
exports.getLocations = async (req, res) => {
  try {
    const locations = await IndustryExpert.distinct('companyAddress'); // Get unique locations
    res.status(200).json(locations); // Return the list of unique locations
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
};
