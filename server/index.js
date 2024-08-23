const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//decation of middel var

const app = express();

const PORT = 5000;

// middelware of mogos

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

//conation of mogodb

mongoose.connect("mongodb://localhost:27017/studentdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const Itemsacma = mongoose.Schema({
  Name: String,
});

const Item = mongoose.model("Item", Itemsacma);
app.get("/read", async (req, res) => {
  try {
    // Fetch items from the database
    const items = await Item.find();
    // Send the items as JSON response
    res.json(items);
  } catch (err) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: err.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    // Create a new user instance
    const newUser = new Item(req.body);

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
