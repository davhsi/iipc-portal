// FacultyVisit.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the FacultyVisit schema
const FacultyVisitSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    facultyid: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    mailid: {
        type: String,
        required: true,
        trim: true
    },
    event: {
        type: String,
        required: true,
        trim: true
    },
    typeevent: {
        type: String,
        required: true,
        trim: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventLocation: {
        type: String,
        required: true,
        trim: true
    },
    eventOrganizer: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Create a model from the schema
const FacultyVisit = mongoose.model('FacultyVisit', FacultyVisitSchema);

module.exports = FacultyVisit;
