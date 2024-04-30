const createSchemas = require("./createSchemas");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const Router = require("./users.js");
app.use("/api", Router);

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});

createSchemas();
