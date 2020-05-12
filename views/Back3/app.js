const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// udostepnianie innych folderow - tutaj o nazwie "public" (zeby css dzialal i js na przyklad) //
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

// zwroty formularzy z htmla (i juz pozniej nie tylko) //
app.post("/", function(req, res){

  var firstName = req.body.fName;
  var secondName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName
        }
      }
      // jesli byloby wiecej subskrybujacych osob,
      // to wiecej obiektow wygladajacych wlasnie tak:
      // {email_address: ...
      // }
      // {}
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/3690a60b32",
    method: "POST",
    headers: {
      "Authorization": "piter1 0ae1ffe6eaa5ab5d762e674ce0a7482f-us20"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if(error)
    {
      // console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else{
      // console.log(response.statusCode);
      if(response.statusCode === 200)
      {
        res.sendFile(__dirname + "/success.html");
      }
      res.sendFile(__dirname + "/failure.html");
    }

  });

});

// nr-list: 3690a60b32
// api key: 0ae1ffe6eaa5ab5d762e674ce0a7482f-us20

app.post("/failure", function(req, res){
  res.redirect("/");
});

// app.listen(3000, function(){
//   console.log("Server started on port 3000");
// });

// zmieniona wersja dla heroku - zewnetrznego serwera - widocznego dla wszystkich

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
