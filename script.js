$ideaTitle = $('.input-title');
$ideaBody = $('.input-body');
$ideaSave = $('.save-button');
$ideaSearch = $('.search');
$anchor = $('.card-section');
var quality = 0;

$ideaSave.on('click', userInput);
// $('').on('click', deleteCard);

function objectToString(newestIdea) {
  var newObjectString = JSON.stringify(newestIdea);
  console.log(newObjectString);
  localStorage.setItem(newestIdea.id, newObjectString);
}


// Save button functionality
function userInput() {
  var ideaTitle = $ideaTitle.val();
  var ideaBody = $ideaBody.val();
  var newestIdea = new CardInfo(ideaTitle, ideaBody);
  cardCreater(newestIdea);
  console.log(newestIdea);
  objectToString(newestIdea);
};

function cardCreater(idea) {
  $anchor.prepend(`<article class="card">
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
};

// // Delete button functionality
// $anchor.on('click', function () {
//   console.log('click damn you!');
// });

// function deleteCard() {
//   console.log('its connected');
// };

// // Upvote and Downvote functionality
// $anchor.on('click', function () {
//   console.log('great idea');
//   quality += 1;
//   console.log(quality);
//   checkQuality ();
// });

// $anchor.on('click', function () {
//   console.log('terrible idea');
//   quality -= 1;
//   console.log(quality);
//   checkQuality ();
// });

// function checkQuality() {
//   if (quality === 1) {
//     $('.quality-text').text('plausible');
//   } else if (quality === 2) {
//     $('.quality-text').text('genius');
//   } else {
//     $('.quality-text').text('swill');
//   }
// };



