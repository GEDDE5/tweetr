"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db, ObjectId) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().sort('createdAt', -1).toArray(callback);
    },

    likeHandler: function(tweetID, method, callback) {
      db.collection('tweets').find( { _id: new ObjectId(tweetID) } ).toArray((err, res) => {
        if(err) {
          console.log(err);
        }
        if(method === 'get') {
          callback(null, res[9].likes);
        }
        if(method === 'add') {
          db.collection('tweets').updateOne( { _id: new ObjectId(tweetID) }, { $set: { likes: res[0].likes + 1 } });
          callback(null, res[0].likes + 1);
        }
        // if(method === 'delete'), etc.
      });
    }
  };
};
