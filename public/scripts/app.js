function timeSince(date) {

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

$(document).ready(function() {

  // takes in tweet object
  // returns single tweet <article>
  function createTweetElement(tweet) {

    // function escape(str) {
    //   let p = $('<p>').text(str);
    //   return p[0].innerHTML;
    // }
    // some recursion for escaping whole tweet
    // just in case \ for future personal reference
    // function sanitize(obj) {
    //   for(let key in obj) {
    //     if(obj.hasOwnProperty(key)) {
    //       if(obj[key].constructor === Object) {
    //         sanitize(obj[key]);
    //       } else if (obj[key].constructor === String) {
    //         obj[key] = escape(obj[key]);
    //       }
    //     }
    //   }
    // }
    // sanitize(tweet);

    const createdAt = timeSince(tweet.createdAt);

    let avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.small);
    let user = $('<h1>').addClass('user').text(tweet.user.name);
    let handle = $('<p>').addClass('handle').text(tweet.user.handle);
    let header = $('<header>').addClass('header').append(avatar, user, handle);

    let content = $('<p>').addClass('body').text(tweet.content.text);

    let date = $('<p>').addClass('date').text(createdAt);
    let iHeart = $('<i>').addClass('fa fa-heart icon').attr('aria-hidden', 'true');
    let iFlag = $('<i>').addClass('fa fa-flag icon').attr('aria-hidden', 'true');
    let iRetweet = $('<i>').addClass('fa fa-retweet icon').attr('aria-hidden', 'true');
    let footer = $('<footer>').addClass('footer clearfix').append(date, iHeart, iFlag, iRetweet);

    let article = $('<article>').addClass('tweet').attr('data-tweet-id', tweet._id).append(header, content, footer);

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

  // handles toggling of new-tweet section
  function toggleHanlder() {
    $('#nav-bar .compose').on('click', function() {
      $('section.new-tweet').slideToggle('fast', function() {
        $(this).find('.input').focus();
      });
    });
  }

  toggleHanlder();

  function submitHandler() {
    const form = $('.new-tweet .tweet-form');
    const error = form.find('.error');
    const input = form.find('.input');
    const button = form.find('input[type="Submit"]');
    const counter = form.find('.counter');

    // posts to /tweets, displays tweet on success
    function postForm(route, selector) {
      $.post(route, form.serialize())
       .then(function(tweet) {
         $(selector).prepend(createTweetElement(tweet));
         input.val('').focus();
         counter.text(140);
       });
    }

    // a couple of helper functions for the <textarea>'s errors
    // * there has got to be a better way to handle this
    // * todo: ^
    const errors = {
      exist:
        () => {
          conditions = [
            input.val() === null,
            140 - input.val().length < 0,
            $.trim(input.val()) === ''
          ];
          for(c of conditions){
            if(c) {
              return true;
            }
          }
          return false;
        },
      monitor:
        () => {
          error.text('');
          if(input.val() === '' || input.val() === null) {
            error.text('Error: Input cannot be empty');
          }
          if(140 - input.val().length < 0) {
            error.text('Error: Input exceeds 140 characters');
          }
          return;
        }
    };

    // monitors <textarea> for changes on input and displays errors accordingly
    $(input).on('input', () => {
      errors.monitor();
    });

    // disallows <enter> key from default behaviour
    $(input).on('keypress', event => {
      if(event.key === 'Enter') {
        event.preventDefault();
      }
    });

    // ensures errors are displayed on clicking form's button
    $(button).on('click', () => {
      errors.monitor();
    });

    // submits form if user presses <enter> while in <textarea>
    $(input).on('keydown', event => {
      if(!errors.exist() && event.key === 'Enter') {
        event.preventDefault();
        postForm('tweets', '.tweets');
      }
    });

    // finally, POST the thing like a normal person if there're no errors
    $(form).on('submit', event => {
      event.preventDefault();
      if(!errors.exist()) {
        postForm('tweets', '.tweets');
      }
    });
  }

  submitHandler();

  function likeHandler() {
    $('.tweets').on('click', '.fa-heart', function() {
      const heart = $(this);
      // heart.hasClass('liked') ? heart.removeClass('liked') : heart.addClass('liked');
      // the above is less silly but doesn't work unless it's modified to be done as it's done below
      // ???
      if(heart.hasClass('liked')) {
        heart.removeClass('liked');
        heart.css('color', '');
      } else {
        heart.addClass('liked');
        heart.css('color', 'red');
      }
      let tweetID = heart.closest('.tweet').data('tweet-id');
      $.post('tweets/' + tweetID)
       .then(function(err, res) {
         if(err) {
           console.log(err);
         }
         console.log(res);
       });
    });
  }

  likeHandler();

});