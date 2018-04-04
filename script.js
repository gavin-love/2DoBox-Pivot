$ideaTitle = $('.input-title');
$ideaBody = $('.input-body');
$ideaSave = $('.save-button');
$ideaSearch = $('.search');
var quality = 0;

// Creat Cards and add classes
$ideaSave.on('click', userInput);

function cardCreater(idea) {
  $("ul").prepend(`<article class="card">
                      <h2 class=".title-display">${idea.title}</h2>
                      <input type="button" name="delete button" class="delete-button">
                      <p class="card-body">${idea.body}</p>
                      <input type="button" class="arrow-button upvote">
                      <input type="button" class="arrow-button downvote">
                      <h3 class="quality">quality: <span class="quality-text">swill<span>
                      </h3>
                    </article>`);
};

// Create object
function CardInfo (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

// Save button functionality
function userInput() {
  var ideaTitle = $ideaTitle.val();
  var ideaBody = $ideaBody.val();
  var newestIdea = new CardInfo(ideaTitle, ideaBody);
  cardCreater(newestIdea);
  console.log(newestIdea);
  console.log(ideaTitle);
};

// Delete button functionality
$('.delete-button').on('click', function () {
  deleteButton = $(this).closest('article');
  deleteButton.remove();
});

// Upvote and Downvote functionality
$('.upvote').on('click', function () {
  console.log('great idea');
  quality += 1;
  console.log(quality);
  checkQuality ();
});

$('.downvote').on('click', function () {
  console.log('terrible idea');
  quality -= 1;
  console.log(quality);
  checkQuality ();
});

function checkQuality() {
  if (quality === 1) {
    $('.quality-text').text('plausible');
  } else if (quality === 2) {
    $('.quality-text').text('genius');
  } else {
    $('.quality-text').text('swill');
  }
};



