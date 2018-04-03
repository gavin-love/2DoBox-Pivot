var ideaTitle = $('.input-title').val();
var ideaBody = $('.input-body').val();
var ideaSave = $('.save-button');
var ideaSearch = $('.search');
var quality = 0;

// Creat Cards and add classes
ideaSave.on('click', function cardCreater () {
  $("ul").prepend('<article class="card"><h2 class="title-display"></h2><input type="button" name="delete button" class="delete-button"><p class="card-body"></p><input type="button" class="arrow-button upvote"><input type="button" class="arrow-button downvote"><h3 class="quality">quality: <span class="quality-text">swill<span></h3></article>');
  userInput();

// Create object


// Save button functionality
function userInput() {
  var ideaTitle = $('.input-title').val();
  $('.title-display').text(ideaTitle);
  var ideaBody = $('this.input-body').val();
  $('.card-body').text(ideaBody);
};

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

function CardInfo (title, body, quality) {
  this.title = title;
  this.body = body;
  this.quality = quality;
}



