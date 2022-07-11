const express = require("express");
const User = require("../schema/userSchema.js");
const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(500).send("User already exists");
  } else
    User.create(req.body, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.status(200).send("Successfully signed in");
  } else {
    res.status(500).send("Invalid Username or Password");
  }
});

router.get("/users", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/getUser", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  try {
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    res.status(200).send("Successfully signed in");
  }
});

//get user data from user id

router.get("/getUser/:id", async (req, res) => {
  
  const user = await User.find({
    _id: req.params.id,
  });
  try {
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    res.status(200).send("Successfully signed in");
  }
});


router.post("/updateuser", async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.country = req.body.country || user.country;
    user.state = req.body.state || user.state;
    user.city = req.body.city || user.city;
    user.profession = req.body.profession || user.profession;
    user.institution = req.body.institution || user.institution;
    user.pic = req.body.pic || user.pic;

    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
