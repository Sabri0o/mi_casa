const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


////////

const db = require("./app/models");
db.sequelize.sync({ force: true })
.then(() => {
  console.log("Database connected !")
})
.catch(() => {
  console.log("error while connection to db")
})



// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// //////

// simple route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to 'mi casa es tu casa' application. \n this is a GET route for test" });
});
////We also need to include routes in server.js (right before app.listen()):
require("./app/routes/mctc.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
