const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const library = require("./src/library");
const db = require("./src/models");
const cors = require("cors");

db.sequelize.sync();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hellow world!");
});

app.use("/library", library);

app.listen(8080, () => console.log(`Listening on port 8080`));
