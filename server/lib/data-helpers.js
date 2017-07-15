"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    // Inserts one tweet each time and calls callback function
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db` into an array, auto sorted by newest first
    // and calls callback function
    getTweets: function(callback) {
      db.collection('tweets').find().toArray(callback);
    }
  };
};
