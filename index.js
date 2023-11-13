const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT;

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true });

const con = mongoose.connection;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  con.on("open", () => {
    console.log("mongoDB connected!!!");
  });
} catch (error) {
  console.log("Error: " + error);
}

const userRouter = require("./router/index");
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("welcome!!!!");
});

app.listen(PORT, () => {
  console.log(`This Node application is running on ${PORT}`);
});
