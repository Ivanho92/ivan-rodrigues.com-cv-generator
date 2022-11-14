require("dotenv").config();

const path = require("path");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const express = require("express");
const generateCV = require("./generate-cv");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

app.post("/generate-cv", bodyParser.json(), async (req, res) => {
  const data = req.body;

  try {
    const urls = await generateCV(data);
    res.status(200).json({ status: "success", urls });
  } catch (error) {
    console.error(chalk.red(error));
    res.status(400).json({ status: "error", message: error });
  }
});

app.listen(port, () => {
  console.log(`CV Generator listening on http://localhost:${port}...`);
});
