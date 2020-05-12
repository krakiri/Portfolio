popup = {
init: function(){
$('figure').click(function(){
  popup.open($(this));
});

$(document).on('click', '.popup img', function(){
  return false;
}).on('click', '.popup', function(){
  popup.close();
})
},
open: function($figure) {
$('.gallery').addClass('pop');
$popup = $('<div class="popup" />').appendTo($('body'));
$fig = $figure.clone().appendTo($('.popup'));
$bg = $('<div class="bg" />').appendTo($('.popup'));
$close = $('<div class="close"><div class="X"></div></div>').appendTo($fig);
$shadow = $('<div class="shadow" />').appendTo($fig);
$clickable = $('.not_clickable').addClass('clickable');
src = $('img', $fig).attr('src');
$shadow.css({backgroundImage: 'url(' + src + ')'});
$bg.css({backgroundImage: 'url(' + src + ')'});
setTimeout(function(){
  $('.popup').addClass('pop');
}, 10);
},
close: function(){
$('.gallery, .popup').removeClass('pop');
$('.not_clickable').removeClass('clickable');
setTimeout(function(){
  $('.popup').remove()
}, 100);
}
}

popup.init()
