$ideaTitle = $('.input-title');
$ideaBody = $('.input-body');
$ideaSave = $('.save-button');
$ideaSearch = $('.search');
$anchor = $('.card-section');
var quality = 0;
recreateCards();

$ideaSave.on('click', userInput);

// Save button functionality
function userInput() {
  var ideaTitle = $ideaTitle.val();
  var ideaBody = $ideaBody.val();
  var newestIdea = new CardInfo(ideaTitle, ideaBody);
  cardCreater(newestIdea);
  objectToString(newestIdea);
};

// Create object
function CardInfo (title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
};

function cardCreater(idea) {
  $anchor.prepend(`<article id=${idea.id} class="card">
                      <h2 class=".title-display">${idea.title}</h2>
                      <input type="button" name="delete button" class="delete-button" onClick="deleteCard(${idea.id})">
                      <p class="card-body">${idea.body}</p>
                      <input type="button" class="arrow-button upvote">
                      <input type="button" class="arrow-button downvote">
                      <h3 class="quality">quality: <span class="quality-text">swill<span>
                      </h3>
                    </article>`);
};

function objectToString(newestIdea) {
  var newObjectString = JSON.stringify(newestIdea);
  localStorage.setItem(newestIdea.id, newObjectString);
}

function recreateCards() {
  for (var i = 0; i < localStorage.length; i++) {
    var returnCard = localStorage.getItem(localStorage.key(i));
    var parsedCard = JSON.parse(returnCard);
    cardCreater(parsedCard);
  }
}

function deleteCard(id) {
  $thisArticle = $(`#${id}`);
  $thisArticle.css('display', 'none');
}

// //need to add in to save button ability to clear input fields after save
// $('.save-button').click(function() {
//     $('.input').val("");
// });

// //need to make save disaibled if input fields are empty
// function toggleButton () {
//   var disabled;
//   if (inputTitle.value === "" && inputUrl.value === "") {
//     enterButton.disabled = true;
//   } else {
//     enterButton.disabled = false;
//   }
// }

// //need to make display:none cards also deleted from local storage
// localStorage.removeItem(); takes a key and removes 
// that key and its associated value from storage.

//need to make design responsive
//need to get upvote and down vote working




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