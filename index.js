const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017");

cloudinary.config({
  cloud_name: "dkemlj8lb",
  api_key: "651799129757548",
  api_secret: "yarlMBsodPfnKP7I103hKFuXLjs",
});

app.get("/", (req, res) => {
  console.log("route/");
  res.status(200).json({ message: "route /" });
});

const userRoutes = require("./routes/user");
app.use(userRoutes);

const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "route not found" });
});

app.listen(4000, () => {
  console.log("server ON!");
});
