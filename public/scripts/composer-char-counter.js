$(document).ready(() => {
  $('.new-tweet textarea').on('keyup', function() {
    let charsLeft = 140 - $(this).val().length;;
    let counter = $(this).closest('form').find('.counter');
    counter.text(charsLeft);
    if(charsLeft < 0) {
      counter.css('color', 'red');
      $(this).closest('form').find('input[type=submit]').attr('disabled', 'disdabled');
    } else {
      counter.css('color', 'black');
      $(this).closest('form').find('input[type=submit]').removeAttr('disabled');
    }
  });
});