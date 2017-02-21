$(document).ready(function() {
  $('.new-tweet input[type="submit"]').on('click', function (event) {
    event.preventDefault();
    let data = $(this).closest('form').find('textarea').serialize();
    $.post('tweets', data, function(res) {
      console.log(res);
    });
  });
});
