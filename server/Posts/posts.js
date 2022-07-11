const { response } = require("express");
const express = require("express");
const PostModel = require("./postSchema");
const router = express.Router();

// router.post("/post", async (req, res) => {
//   console.log(req.body);
//   const Post = await PostModel(req.body);
//   try {
//     await Post.save();
//     res.send(Post);
//   } catch (error) {
//     res.status(500).send("error occured");
//   }
// });

router.post("/post", async (req, res) => {
  console.log(req.body);
  PostModel.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/fetchAllPost", async (req, res) => {
  const Post = await PostModel.find({});
  try {
    res.send(Post);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/fetchByUsername", async (req, res) => {
  const username = req.body.username;
  const Post = await PostModel.findOne({ username });

  try {
    res.send(Post);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
