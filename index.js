//jshint esversion:6

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({
  extended: true
}));




app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post('/', function(req, res) {

  console.log(req.body);

  var amount1 = req.body.amount;


  var a1 = req.body.crypto;
  var a2 = req.body.fiat;
  var a3 = a1 + a2;

  var options = {
   url: "https://apiv2.bitcoinaverage.com/convert/global",
   method : "GET",
   qs: {
    from: a1,
    to: a2,
    amount: amount1

  }


};


  request(options , function(error, response, body) {

  var data = JSON.parse(body);
  var price = data.price;
  console.log(price);
  var currentDate = data.time;
  res.write("<p>The current date is " + currentDate + "<p>");
  res.write("<h1>The price of " + amount1 + " "+ a1 + " is " + price + " " + a2 + "<h1>");
  res.send();


  });




});







app.listen(3000, function() {

  console.log("Server is running");

});
