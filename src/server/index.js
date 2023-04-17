const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const stationsJson = require("../../stations.json");

app.use(cors());
app.use(express.json());

const notFoundMessage = {
  status: "Not Found!",
};

const successMessage = {
  status: "Success",
};

app.get("/stations", (req, res) => {
  res.status(200).send({ ...stationsJson });
});

app.get("/station/:id", (req, res) => {
  const queryId = req.params.id;
  if (!queryId) {
    res.status(404).json(notFoundMessage);
    return;
  }
  const filteredResponse = stationsJson.data.find((item) => {
    return item.id == queryId;
  });
  res.status(200).json({
    ...successMessage,
    data: {
      ...filteredResponse,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
