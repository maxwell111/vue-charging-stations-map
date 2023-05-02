const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const stationsJson = require("../../stations.json");
const messages = require("./messages");

app.use(cors());
app.use(express.json());

/* GET Request
 ** Basic url to get all stations
 ** http://localhost:3000/stations,
 */

app.get("/stations", (req, res) => {
  res.status(200).json({
    ...messages.successMessage,
    data: [...stationsJson.data],
  });
});

/* GET Request
 ** Basic url to get single station
 ** http://localhost:3000/station/:id,
 */

app.get("/station/:id", (req, res) => {
  const queryId = Number(req.params.id);
  if (!queryId) {
    res.status(404).json(messages.notFoundMessage);
    return;
  }
  const filteredResponse = stationsJson.data.find((item) => {
    return item.id === queryId;
  });

  res.status(200).json({
    ...messages.successMessage,
    data: filteredResponse,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
