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

// Get Industry Experts with filtering
// Get Industry Experts with filtering
// Get Industry Experts with filtering
exports.getIndustryExperts = async (req, res) => {
  try {
    const { name, startDate, endDate, domainOfExpertise, companyAddress, eventType, rating } = req.body;

    // Initialize query object
    let query = {};

    // Filter by name (both first and last name)
    if (name) {
      query.$or = [
        { firstname: { $regex: name, $options: 'i' } },  // Case-insensitive search in firstname
        { lastname: { $regex: name, $options: 'i' } }    // Case-insensitive search in lastname
      ];
    }

    // Filter by event date range
    if (startDate || endDate) {
      query.eventDate = {};
      if (startDate) query.eventDate.$gte = new Date(startDate);
      if (endDate) query.eventDate.$lte = new Date(endDate);
    }

    // Filter by domain of expertise
    if (domainOfExpertise) {
      query.domainOfExpertise = domainOfExpertise;
    }

    // Filter by company address
    if (companyAddress) {
      query.companyAddress = companyAddress;
    }

    // Filter by event type
    if (eventType) {
      query.eventType = eventType;
    }

    // Filter by star rating
    if (rating) {
      query.rating = rating;
    }

    // Fetch the experts using the constructed query
    const experts = await IndustryExpert.find(query).sort({ eventDate: -1 }).limit(20); // Default to last 20 records

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
exports.getUniqueDomains = async (req, res) => {
  try {
    const domains = await IndustryExpert.distinct('domainOfExpertise'); // Get unique domains
    res.status(200).json(domains); // Return the list of unique domains
  } catch (error) {
    console.error('Error fetching unique domains:', error);
    res.status(500).json({ message: 'Error fetching unique domains', error: error.message });
  }
};

// Fetch all unique locations from Industry Experts
exports.getUniqueLocations = async (req, res) => {
  try {
    const locations = await IndustryExpert.distinct('companyAddress'); // Get unique locations
    res.status(200).json(locations); // Return the list of unique locations
  } catch (error) {
    console.error('Error fetching unique locations:', error);
    res.status(500).json({ message: 'Error fetching unique locations', error: error.message });
  }
};

// Fetch all unique event types from Industry Experts
exports.getUniqueEventTypes = async (req, res) => {
  try {
    const eventTypes = await IndustryExpert.distinct('eventType'); // Get unique event types
    res.status(200).json(eventTypes); // Return the list of unique event types
  } catch (error) {
    console.error('Error fetching unique event types:', error);
    res.status(500).json({ message: 'Error fetching unique event types', error: error.message });
  }
};
