"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const {MongoClient} = require('mongodb');
const {ObjectId}    = require('mongodb');
const MONGODB_URI   = 'mongodb://localhost:27017/tweeter';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const DataHelpers = require("./lib/data-helpers.js");
const tweetsRoutes = require("./routes/tweets");

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    throw err;
  }
  console.log(`Connected to ${MONGODB_URI}`);
  app.use('/tweets', tweetsRoutes(DataHelpers(db, ObjectId)));
  // db.close(); breaks the app; exclude it
});

app.listen(PORT, () => {
  console.log("tweetr app listening on port " + PORT);
});
