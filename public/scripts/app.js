/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( () => {

  // handles toggling of new-tweet section
  $('#nav-bar .compose').on('click', function() {
    $('section.new-tweet').slideToggle('fast', function() {
      $(this).find('textarea').focus();
    });
  });

  // use jquery's .text() to escape user-inputted strings
  function escape(str) {
    let p = $('<p>').text(str);
    return p[0].innerHTML;
  }

  // takes in tweet object
  // returns single tweet article HTML
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

  // takes in list of tweets objects
  // appends tweets to .tweets container in index.html
  function renderTweets(tweets) {
    for(let tweet of tweets) {
      $('.tweets').append(createTweetElement(tweet));
    }
  }

  // GETs JSON data from /tweets route
  // passes result to renderTweets()
  function loadTweets() {
    $.getJSON('tweets', function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  function submitHandler() {
    $('.new-tweet input[type="submit"]').on('click', function (event) {
      event.preventDefault();

      let form = $(this).closest('form');
      let input = form.find('textarea');
      let error = form.find('p');

      // removes error element if present
      if(error.length) {
        error.remove();
      }

      if(input.val() === '') {
        $(this).after('<p>Error: Input cannot be empty</p>');
      } else if(140 - input.val().length < 0) {
        $(this).after('<p>Error: Input exceeds 140 characters</p>');
      } else {
        $.post('tweets', input.serialize(), function(tweet) {
          $('.tweets').prepend(createTweetElement(tweet));
          input.val('');
        });
      }

    });
  }

  submitHandler();

});