var ideaTitle = $('.input-title').val();
var ideaBody = $('.input-body').val();
var ideaSave = $('.save-button');
var ideaSearch = $('.search');
// var qualityText = $('.quality-text').val();
var quality = 0;

// Save button functionality
ideaSave.on('click', function () {
  var ideaTitle = $('.input-title').val();
  $('.title-display').text(ideaTitle);
  var ideaBody = $('.input-body').val();
  $('.card-body').text(ideaBody);
});

// Delete button functionality
$('.delete-button').on('click', function () {
  var deleteButton = $(this).parent();
  console.log(deleteButton);
  deleteButton.remove();
});

// Upvote and Downvote functionality
$('.upvote').on('click', function () {
  console.log('great idea');
  quality += 1;
  console.log(quality);
  checkQuality ();
})

$('.downvote').on('click', function () {
  console.log('terrible idea');
  quality -= 1;
  console.log(quality);
  checkQuality ();
})

function checkQuality() {
  if (quality === 1) {
    $('.quality-text').text('plausible');
  } else if (quality === 2) {
    $('.quality-text').text('genius');
  } else {
    $('.quality-text').text('swill');
  }
}

function cardCreater () {
  
}