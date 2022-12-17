const express = require("express");
require("dotenv").config();

console.log(process.env);

// Creating the expresss server
const app = express();

// Public directory
app.use(express.static("public"));

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// TODO: CRUD: events

// Listen requests
app.listen(process.env.PORT, () => {
  console.log("Server running in port ", process.env.PORT);
});
