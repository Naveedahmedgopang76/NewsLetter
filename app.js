const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve the index.html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/signup.html"));
});

app.post("/", function (req, res) {
  const firstname = req.body.FName;
  const lastName = req.body.LtName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/fa8c5d62bf";

  const options = {
    method: "POST",
    auth: "police:34f8973502a596ed57d4b08ddc83c917-us13",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html"); // serve the failure page
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server in running on port 3000");
});

// api key
//623ee54fd3819c9dbc1d0a47e19575a2-us13

//unique id
//fa8c5d62bf

//api
//  351ca79cb602a48c1b5a8d2b03d0da12-us13
