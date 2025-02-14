const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const appointmentRouter = require("./routes/appointments");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/appointments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/appointments", appointmentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
