const express = require("express");
const bodyParser = require("body-parser");
const Events = require("./events");
const connectDatabase = require("./db");

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const events = new Events();

app.use(express.static(__dirname));

//for example
events.on("submit form", () => {
  setTimeout(() => {
    console.log("hello");
  }, 2000);
});

app.get("/trigger-event", (req, res) => {
  events.trigger("submit form");
  res.send("Event triggered!");
  events.off("submit form");
});

connectDatabase();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
