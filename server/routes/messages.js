const { response } = require("express");
const express = require("express");
const Message = require("../schema/messageSchema");
const router = express.Router();

//add

router.post("/messages", async (req,res) => {
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
});

//get

router.get("/messages/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
