$(document).ready(() => {
  $('.new-tweet textarea').on('keyup', function() {
    let charsLeft = 140 - $(this).val().length;;
    let counter = $(this).closest('form').find('.counter');
    counter.text(charsLeft);
    charsLeft < 0 ? counter.css('color', 'red') : counter.css('color', 'black');
    });
});