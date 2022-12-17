const express = require("express");
require("dotenv").config();

console.log(process.env);

// Creating the expresss server
const app = express();

// Public directory
app.use(express.static("public"));

// Routes
// app.get("/", (req, res) => {

// });

// Listen requests
app.listen(process.env.PORT, () => {
  console.log("Server running in port ", process.env.PORT);
});
