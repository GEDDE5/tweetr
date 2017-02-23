/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready( () => {

  // handles toggling of new-tweet section
  function toggleHanlder() {
    $('#nav-bar .compose').on('click', function() {
      $('section.new-tweet').slideToggle('fast', function() {
        $(this).find('textarea').focus();
      });
    });
  }

  toggleHanlder();

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
    $.getJSON('tweets')
     .then(function(tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  function submitHandler() {
    const form = $('.new-tweet .tweet-form');
    const error = form.find('.error');
    const input = form.find('.input');
    const button = form.find('input[type="Submit"]')

    // posts to /tweets, displays tweet on success
    function postForm(route, selector) {
      $.post(route, form.serialize())
       .then(function(tweet) {
        $(selector).prepend(createTweetElement(tweet));
        input.val('').focus();
      });
    }

    // a couple of helper functions
    const errors = {
      exist:
        () => {
          if(input.val() === '' || input.val() == null || 140 - input.val().length < 0) {
            return true;
          }
          return false;
        },
      check:
        () => {
         error.text('');
         if(input.val() === '' || input.val() == null) {
            error.text('Error: Input cannot be empty')
          }
         if(140 - input.val().length < 0) {
            error.text('Error: Input exceeds 140 characters');
         }
         return;
        }
    };

    // monitors <textarea> and displays errors accordingly
    $(input).on('input', () => {
      errors.check();
    });

    // Disallows <enter> key from being pressed
    $(input).on('keypress', event => {
      if(event.key === 'Enter') {
        event.preventDefault();
      }
    });

    // submits form if user presses <enter> while in <textarea>
    $(input).on('keydown', event => {
      if(!errors.exist() && event.key === 'Enter') {
        event.preventDefault();
        postForm('tweets', '.tweets');
      }
    });

    // ensures errors are displayed if user clicks submit button
    $(button).on('click', () => {
      errors.check();
    });

    // self-explanatory
    $(form).on('submit', event => {
      event.preventDefault();
      if(!errors.exist()) {
        postForm('tweets', '.tweets');
      }
    });

  }

  submitHandler();

});