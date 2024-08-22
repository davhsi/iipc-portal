const IndustryExpert = require('../models/IndustryExpert');

// Add a new Industry Expert

exports.addIndustryExpert = async (req, res) => {
  try {
    console.log(req.body); // Add this line to debug
    const expert = new IndustryExpert(req.body);
    await expert.save();
    res.status(201).json(expert);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};




// Get all Industry Experts
exports.getIndustryExperts = async (req, res) => {
  try {
    const experts = await IndustryExpert.find();
    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getIndustryExpertById = async (req, res) => {
  try {
    const expert = await IndustryExpert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Industry Expert not found' });
    }
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing Industry Expert
exports.updateIndustryExpert = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpert = await IndustryExpert.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // validate the update operation
    });

    if (!updatedExpert) {
      return res.status(404).json({ message: 'Industry Expert not found' });
    }

    res.status(200).json(updatedExpert);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
