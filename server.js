const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/updateData", async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data.json");
    const existingData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

    const newData = req.body;
    existingData.push(newData);

    await fs.writeFile(dataPath, JSON.stringify(existingData, null, 2));

    res.status(200).send("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
