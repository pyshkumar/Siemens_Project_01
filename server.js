const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkDB", async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data.json");

    const dataExists = await fs
      .access(dataPath)
      .then(() => true)
      .catch(() => false);

    if (!dataExists) {
      await fs.writeFile(dataPath, JSON.stringify([], null, 2));
      res.json({ numRecords: 0 });
    } else {
      const existingData = JSON.parse(await fs.readFile(dataPath, "utf-8"));
      res.json({ numRecords: existingData.length });
    }
  } catch (error) {
    console.error("Error checking database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/checkEmployeeId", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const dataPath = path.join(__dirname, "data.json");
    const existingData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

    const employeeExists = existingData.some(
      (employee) => employee.employeeId === employeeId
    );
    res.json({ exists: employeeExists });
  } catch (error) {
    console.error("Error checking employeeId:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addData", async (req, res) => {
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

app.post("/editData", async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "data.json");
    const existingData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

    const updatedData = req.body;
    const index = existingData.findIndex(
      (employee) => employee.employeeId === updatedData.employeeId
    );

    if (index !== -1) {
      existingData[index] = updatedData;
      await fs.writeFile(dataPath, JSON.stringify(existingData, null, 2));
      res.status(200).send("Data updated successfully");
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deleteData", async (req, res) => {
  try {
    const { employeeId } = req.body;
    const dataPath = path.join(__dirname, "data.json");
    const existingData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

    const newData = existingData.filter(
      (employee) => employee.employeeId !== employeeId
    );

    if (newData.length < existingData.length) {
      await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
      res.status(200).send("Data deleted successfully");
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
