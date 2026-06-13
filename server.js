console.log("XXXXXXXXXXXX NEW VERSION XXXXXXXX");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Contact = require("./models/Contact");
const Reservation = require("./models/Reservation");

const app = express();

/* MONGODB CONNECTION */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* TEST ROUTE */
app.get('/test-server', (req, res) => {
  res.json({
    message: "MY SERVER 2026"
  });
});

/* CONTACT ROUTE */
app.post('/api/contact', async (req, res) => {

  try {

    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    await contact.save();

     console.log("🔥 CONTACT ROUTE HIT 🔥");
  console.log(req.body);

  res.json({
    success: true,
    message: "CHIM_TEST_999"
  });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to save contact"
    });

  }

});

/* RESERVATION ROUTE */
app.post('/api/reservations', async (req, res) => {

  try {

    const reservation = new Reservation({

      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,

      date: req.body.date,
      time: req.body.time,

      guests: req.body.guests,

      dietary: req.body.dietary,

      request: req.body.request,

      dishes: req.body.dishes

    });

    await reservation.save();

    console.log("Reservation Saved");

    res.status(201).json({
      success: true,
      message: "Reservation saved successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to save reservation"
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
