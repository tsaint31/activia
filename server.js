const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const path = require("path");
const PG = require("pg");
const bodyParser = require("body-parser");

if (!process.env.DATABASE_URL) {
  console.error("environment variables not sourced");
  exit();
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(
  "/static",
  express.static(path.join(__dirname, "react-app/build/static"))
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Put an origin here, * means everything which is bad.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Needed by ExpressJS
  next();
});


app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "react-app/build/favicon.ico"));
});
// Listen to POST requests.

app.post("/insertdata", function(req, res) {
  console.log("hello3");
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  client.connect();
  client
    .query(
      "INSERT INTO price (id, price, store,date) VALUES (uuid_generate_v4(),$1,$2,Now())",
      [req.body.price, req.body.store]
    )
    .then(res1 => {
      client.end();
      res.send({ result: "success" });
    })
    .catch(error => {
      client.end();
      res.send({ result: "failed" });
      console.warn(error);
    });
});

app.get("/viewpricesall", function(req, res) {
  const client = new PG.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
  console.log("retrieveserver");
  client.connect();
  client
    .query(
      "SELECT price, store, date FROM price ORDER BY date DESC"
    )
    .then(res1 => {
      console.log(res1.rows);
      client.end();
      res.send(res1.rows);
    })
    .catch(error => {
      client.end();
      console.warn(error);
    });
});

app.get("*", (request, result) => {
  result.sendFile(path.join(__dirname, "build/index.html"));
});

app.listen(port, function listening() {
  console.log("Listening on port ", port);
});
