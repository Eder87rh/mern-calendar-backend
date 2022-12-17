const express = require("express");
require("dotenv").config();

console.log(process.env);

// Creating the expresss server
const app = express();

// Public directory
app.use(express.static("public"));
app.use("/api/auth", require("./routes/auth"));

// Routes
// TODO: auth // create, login, renew
// TODO: CRUD: events

// Listen requests
app.listen(process.env.PORT, () => {
  console.log("Server running in port ", process.env.PORT);
});
