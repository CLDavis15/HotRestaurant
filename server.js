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

var waitlist = [
    {

    }
];


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Displays all reservations
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
    res.json(waitlist);
});


app.post("/api/reservations", function (req, res) {

    var newCustomer = req.body;

  for (var i = 0; i < reservations.length; i++){
      if (reservations > 5){
          reservations.push(waitlist);
      }
      else {
        reservations.push(newCustomer);
      }
  }
  res.json(newCustomer);

});

// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});