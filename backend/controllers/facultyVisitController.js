// facultyVisitController.js
const FacultyVisit = require('../models/FacultyVist');

// Controller for creating a new faculty visit
exports.createFacultyVisit = async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log the incoming data
        const newVisit = new FacultyVisit(req.body); // Automatically maps req.body to the model
        await newVisit.save();
        res.status(201).json(newVisit);
    } catch (error) {
        console.error('Error creating faculty visit:', error); // Log the error details
        res.status(400).json({ message: 'Error creating faculty visit', error });
    }
};

exports.updateFacultyVisit = async (req, res) => {
    try {
        const updatedVisit = await FacultyVisit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisit) {
            return res.status(404).json({ message: 'Faculty visit not found' });
        }
        res.status(200).json(updatedVisit);
    } catch (error) {
        console.error('Error updating faculty visit:', error); // Log the error details
        res.status(400).json({ message: 'Error updating faculty visit', error });
    }
};


// Controller for getting all faculty visits
exports.getAllFacultyVisits = async (req, res) => {
    try {
        const visits = await FacultyVisit.find();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty visits', error });
    }
};

// Controller for getting a single faculty visit by ID
exports.getFacultyVisitById = async (req, res) => {
    try {
        const visit = await FacultyVisit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Faculty visit not found' });
        }
        res.status(200).json(visit);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faculty visit', error });
    }
};

// Controller for updating a faculty visit by ID

// Controller for deleting a faculty visit by ID
exports.deleteFacultyVisit = async (req, res) => {
    try {
        const deletedVisit = await FacultyVisit.findByIdAndDelete(req.params.id);
        if (!deletedVisit) {
            return res.status(404).json({ message: 'Faculty visit not found' });
        }
        res.status(200).json({ message: 'Faculty visit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting faculty visit', error });
    }
};
