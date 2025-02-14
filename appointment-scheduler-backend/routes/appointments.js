const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Middleware to get appointment by ID
async function getAppointment(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.appointment = appointment;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new appointment
router.post("/", async (req, res) => {
  const { date, time, description, doctorName, department } = req.body;
  const appointment = new Appointment({
    date,
    time,
    description,
    doctorName,
    department,
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update appointment
router.patch("/:id", getAppointment, async (req, res) => {
  const { appointment } = res;
  const { date, time, description, doctorName, department } = req.body;

  if (date != null) {
    appointment.date = date;
  }
  if (time != null) {
    appointment.time = time;
  }
  if (description != null) {
    appointment.description = description;
  }
  if (doctorName != null) {
    appointment.doctorName = doctorName;
  }
  if (department != null) {
    appointment.department = department;
  }

  try {
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete appointment
router.delete("/:id", getAppointment, async (req, res) => {
  try {
    await res.appointment.deleteOne();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
