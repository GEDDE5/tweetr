"use strict";

const userHelper    = require("../lib/util/user-helper");

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if(!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    if(req.body.text.length > 140) {
      res.status(400).json({ error: 'invalid request: POST body exceeds 140 characters' });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      createdAt: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send(tweet);
      }
    });
  });

  tweetsRoutes.get('/:id', function(req, res) {
    DataHelpers.likeHandler(req.params.id, 'get', (err, likeCount) => {
      if(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      } else {
        console.log(likeCount);
        res.json({ _id: req.params.id, likes: likeCount });
      }
    });
  });

  tweetsRoutes.post('/:id', function (req, res) {
    DataHelpers.likeHandler(req.params.id, 'add', (err, afterIncrement) => {
      if(err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ _id: req.params.id, likes: afterIncrement });
      }
    });
  });

  return tweetsRoutes;
};