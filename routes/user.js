const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// const fileUpload = require("express-fileupload");
// const convertToBase64 = require("../utils/convertToBase64");
// const cloudinary = require("cloudinary").v2;

const User = require("../models/User");
const Offer = require("../models/Offer");

router.post("/user/signup", async (req, res) => {
  const { username, email, description, password } = req.body;

  if (username && email && description && password) {
    const doestEmailExist = await User.findOne({ email: email });

    if (doestEmailExist) {
      res.status(409).json({ message: "Email does already exist" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const newUser = new User({
        email: req.body.email,
        token: token,
        hash: hash,
        salt: salt,
        account: {
          username: req.body.username,
        },
        newsletter: req.body.newsletter,
      });

      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        token: newUser.token,
        account: newUser.account,
      });
    }
  } else {
    res.status(406).json({ message: "Missing info" });
  }
});

module.exports = router;
