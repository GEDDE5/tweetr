let data = {
  user :
    { name : "Rosie Perez",
      handle : "@Perez",
      avatars : { small : "https://vanillicon.com/9a741eef2c9bd73aa58b3138f91ec616_50.png", regular : "https://vanillicon.com/9a741eef2c9bd73aa58b3138f91ec616.png", large : "https://vanillicon.com/9a741eef2c9bd73aa58b3138f91ec616_200.png" } },
      content : { text : "this works" },
      createdAt : 1487902171283 };

$(document).ready( () => {
  let img = $('<img>').attr('src', data.user.avatars.small);
  let h1 = $('<h1>').text(data.user.name);
  let span = $('span').text(data.user.handle);
  let header = $('<header>').append(img, h1, span);

  let content = $('<p>').text(data.content.text);

  let icon = $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true');
  span = $('<span>').append(icon);
  let footer = $('<footer>').text('date').append(span);
  let article = $('<article>').addClass('tweet').append(header, content, footer);
  $('.tweets').append(article);
});




  // let footer = '<footer>' + (createdAt)  + '<span>' + iconHTML + '</span></footer>';


    // let header = '<header>' +
    //                 '<img src="' + (tweet.user.avatars.small) + '" />' +
    //                 '<h1>' + (tweet.user.name) + '</h1>' +
    //                 '<span>' + (tweet.user.handle);
    // let content = '<p>' + (tweet.content.text);

    // // avoid repetition via .map()
    // let icons = ['flag', 'retweet', 'heart'];
    // let iconHTML = icons.map(icon => {
    //   return '<i class="fa fa-' + icon + '" aria-hidden="true"></i>';
    // }).join(' ');