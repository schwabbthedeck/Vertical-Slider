// Custom Vertical News Slider
// Written by Jane Schwab 
// https://github.com/schwabthedeck
// https://janeschwab.co/
// July 2019 
// variable to setInterval for rotating the images
var theRotator;

function listItemClicked (event) {
  // if selected item is 'current' do nothing
  // if it is not active - need to remove active class from other item
  // and add active to clicked item
  if (!$(event).hasClass('active')) {
    showImage($(event).attr('id'));
    $('#sliderList li').removeClass('active');
    $(event).addClass('active');
  }
}

function showImage(id) {
  $('.slide-container').find('.active').removeClass('active').css({
    opacity: 0
  });
  $('#' + id).animate({opacity:1}, 500, function() {
    $(this).addClass('active');
  })
}

function runRotateImages() {
  function rotateImages() {
    // get current image
    var curImage = $(".slide-container a.active");
    var nextImage = curImage.next();
    
    // get current list item
    var curListItem = $('.list-container li.active');
    var nextListItem = curListItem.next();

    // if image is last, list item is last
    if(nextImage.length == 0) {
      nextImage = $('.slide-container a:first');
      nextListItem = $('#sliderList li:first');
    }

    curListItem.removeClass('active');
    nextListItem.addClass('active');
    showImage(nextImage.attr('id'));
  }

  theRotator = setInterval(rotateImages, 4000);
}

$(document).ready(function() {
  // start rotating images
  runRotateImages();
  // set it to pause on hover
  $('#vertical-news-slider').hover(
    function () {
      clearTimeout(clearTimeout(theRotator));
    }, 
    function () {
      runRotateImages();
    }
  )
})