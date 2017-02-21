/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function timeSince(date) {

    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

const data = [
  {
    "user": {
      "name": "Isaac Newton",
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready( () => {

  // use jquery's .text() to escape user-inputted strings
  function escape(str) {
    let p = $('<p>').text(str);
    return p[0].innerHTML;
  }

  function createTweetElement(tweet) {
    // let created_at = new Date(tweet.created_at).toString().split(' ').slice(0, 4).join(' ');
    let created_at = timeSince(tweet.created_at);
    let header = '<header>' +
                    '<img src="' + escape(tweet.user.avatars.small) + '" />' +
                    '<h1>' + escape(tweet.user.name) + '</h1>' +
                    '<span>' + escape(tweet.user.handle);
    let content = '<p>' + escape(tweet.content.text);

    // avoid repetition via .map()
    let icons = ['flag', 'retweet', 'heart'];
    let iconHTML = icons.map(icon => {
      return '<i class="fa fa-' + icon + '" aria-hidden="true"></i>'
    }).join(' ');

    let footer = '<footer>' +
                    escape(created_at)  + '<span>' +
                    iconHTML;
    let article = $('<article>').addClass('tweet').append(header, content, footer);
    return article;
  }

  function renderTweets(tweets) {
    for(tweet of tweets) {
      $('.tweets').append(createTweetElement(tweet));
    }
  }

  renderTweets(data);
});