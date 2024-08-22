const mongoose = require('mongoose');

const industryExpertSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  mailId: { type: String, required: true },
  domainOfExpertise: { type: String, required: true },
  alumnusOfBIT: { type: String, required: true }, // 'Yes' or 'No'
  companyName: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyPhoneNumber: { type: String, required: true },
  companyMailId: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventType: { type: String, required: true },
  eventCoordinator: { type: String, required: true },
  rating: { type: Number, default: 0 } // Use a number for rating, adjust as needed
});

const IndustryExpert = mongoose.model('IndustryExpert', industryExpertSchema);

module.exports = IndustryExpert;
