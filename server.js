// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var reservations = [
  {
    customerName: "Corbin",
    phoneNumber: "794-777-7777",
    customerEmail: "corbin@gmail.com",
    customerId: "CTaylor"
  },
  {
    customerName: "Caleb",
    phoneNumber: "828-302-2384",
    customerEmail: "caleb@gmail.com",
    customerId: "Dave"
  }

];


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Displays all characters
app.get("/api/reservatons", function (req, res) {
  return res.json(reservations);
});

app.get("/api/reservations/:customer", function (req, res) {
  var chosen = req.params.customer;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].customerName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

app.post("/api/reservations", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcustomer = req.body;

  // Using a RegEx Pattern to remove spaces from newCustomer
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcustomer.customerName = newcustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcustomer);

  reservations.push(newcustomer);

  res.json(newcustomer);
});

// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});