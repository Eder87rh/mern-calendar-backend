const express = require("express");

// Creating the expresss server
const app = express();

// Routes
app.get("/", (req, res) => {
  res.json({ ok: true });
});

// Listen requests
app.listen(4000, () => {
  console.log("Server running in port ", 4000);
});
