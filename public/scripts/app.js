/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


$(document).ready( () => {
  function createTweetElement(tweet) {

    let created_at = new Date(tweet.created_at).toString().split(' ').slice(0, 4).join(' ');

    let header = '<header>' +
                    '<img src="' + tweet.user.avatars.small + '" />' +
                    '<h1>' + tweet.user.name + '</h1>' +
                    '<span>' + tweet.user.handle;
    let content = '<p>' + tweet.content.text;
    let footer = '<footer>' +
                    created_at   + '<span>' +
                    '<i class="fa fa-flag" aria-hidden="true"></i>' +
                    '<i class="fa fa-retweet" aria-hidden="true"></i>' +
                    '<i class="fa fa-heart" aria-hidden="true"></i>';

    let article = $('<article>').addClass('tweet').append(header, content, footer);

    return article;
  }

  let $tweet = createTweetElement(tweetData);
  $('.container').append($tweet);
});