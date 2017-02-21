$(document).ready(() => {
  $('.new-tweet textarea').on('keyup', function() {
    let chars = $(this).val().length;
    let charsLeft = 140 - chars;
    let counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(charsLeft);
    charsLeft < 0 ? counter.css('color', 'red') : counter.css('color', 'black');
  });
});