// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
