// Controller for creating a new faculty visit
const FacultyVisit = require('../models/FacultyVisit');

exports.createFacultyVisit = async (req, res) => {
    try {
        const newVisit = new FacultyVisit(req.body); // Automatically maps req.body to the model
        await newVisit.save();
        res.status(201).json(newVisit);
    } catch (error) {
        console.error('Error creating faculty visit:', error);
        res.status(400).json({ message: 'Error creating faculty visit', error });
    }
};

// Controller for updating a faculty visit
exports.updateFacultyVisit = async (req, res) => {
    try {
        const updatedVisit = await FacultyVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisit) {
            return res.status(404).json({ message: 'Faculty visit not found' });
        }
        res.status(200).json(updatedVisit);
    } catch (error) {
        console.error('Error updating faculty visit:', error);
        res.status(400).json({ message: 'Error updating faculty visit', error });
    }
};

// Controller for getting all faculty visits with optional filters
exports.getAllFacultyVisits = async (req, res) => {
    try {
        const filters = {}; // Prepare filters for queries

        if (req.body.eventLocation) filters.eventLocation = req.body.eventLocation;
        if (req.body.typeevent) filters.typeevent = req.body.typeevent;
        if (req.body.startDate && req.body.endDate) {
            filters.eventDate = {
                $gte: new Date(req.body.startDate),
                $lte: new Date(req.body.endDate)
            };
        }

        const visits = await FacultyVisit.find(filters);
        res.status(200).json(visits);
    } catch (error) {
        console.error('Error fetching faculty visits:', error);
        res.status(500).json({ message: 'Error fetching faculty visits', error });
    }
};

// Controller for getting unique event locations and event types
exports.getUniqueEventLocations = async (req, res) => {
    try {
        const locations = await FacultyVisit.distinct('eventLocation');
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching event locations:', error);
        res.status(500).json({ message: 'Error fetching event locations', error });
    }
};

exports.getUniqueEventTypes = async (req, res) => {
    try {
        const eventTypes = await FacultyVisit.distinct('typeevent');
        res.status(200).json(eventTypes);
    } catch (error) {
        console.error('Error fetching event types:', error);
        res.status(500).json({ message: 'Error fetching event types', error });
    }
};

// Controller for deleting a faculty visit
exports.deleteFacultyVisit = async (req, res) => {
    try {
        const deletedVisit = await FacultyVisit.findByIdAndDelete(req.params.id);
        if (!deletedVisit) {
            return res.status(404).json({ message: 'Faculty visit not found' });
        }
        res.status(200).json({ message: 'Faculty visit deleted successfully' });
    } catch (error) {
        console.error('Error deleting faculty visit:', error);
        res.status(500).json({ message: 'Error deleting faculty visit', error });
    }
};
exports.fetchFacultyVisits = async (req, res) => {
    try {
      const { startDate, endDate, eventLocation, typeevent } = req.body;
  
      // Build your query based on the filters provided
      const query = {};
      if (startDate) query.eventDate = { $gte: new Date(startDate) };
      if (endDate) query.eventDate = { $lte: new Date(endDate) };
      if (eventLocation) query.eventLocation = eventLocation;
      if (typeevent) query.typeevent = typeevent;
  
      const visits = await FacultyVisit.find(query);
      res.status(200).json(visits);
    } catch (error) {
      console.error('Error fetching faculty visits:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  exports.getFacultyVisitById = async (req, res) => {
    try {
        const visit = await FacultyVisit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Faculty visit not found' });
        }
        res.status(200).json(visit);
    } catch (error) {
        console.error('Error fetching faculty visit by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
