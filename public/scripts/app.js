/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( () => {

  // use jquery's .text() to escape user-inputted strings
  function escape(str) {
    let p = $('<p>').text(str);
    return p[0].innerHTML;
  }

  function createTweetElement(tweet) {
    let created_at = new Date(tweet.created_at).toString().split(' ').slice(0, 4).join(' ');
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
    for(let tweet of tweets) {
      $('.tweets').append(createTweetElement(tweet));
    }
  }
  function loadTweets() {
    $.getJSON('tweets', function(tweets) {
      renderTweets(tweets);
    });
  }
  loadTweets();
});