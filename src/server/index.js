const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const stationsJson = require("../../stations.json");

app.get("/stations", (req, res) => {
  res.status(200).send({ ...stationsJson });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
