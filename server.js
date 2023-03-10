const express = require('express')
const app = express()
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require('cors')
const routes = require('./src/routes')
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "tmp", "uploads"))
);

app.use(routes)

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@material-x.eemux5n.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectou ao banco!");
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));