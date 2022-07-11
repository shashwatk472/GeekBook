const express = require("express");
const app = express();
const router = express.Router();
const connectDB = require("./db-connect/db.js");
require("dotenv").config();
const authRouter = require("./authentication/auth.js");
const postRouter = require("./Posts/posts");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());
app.use(authRouter);
app.use(postRouter);
app.use("/conversations",conversationRouter);
app.use(messageRouter);
// app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT} `);
});
