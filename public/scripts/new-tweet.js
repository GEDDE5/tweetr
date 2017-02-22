$(document).ready(function() {
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
      $.post('tweets', input.serialize());
    }

  });
});
