$ideaTitle = $('.input-title');
$ideaBody = $('.input-body');
$ideaSave = $('.save-button');
$ideaSearch = $('.search');
$anchor = $('.card-section');
var quality = 0;
recreateCards();

$ideaSave.on('click', validateInput);
$ideaTitle.on('keyup', toggleButton);
$ideaBody.on('keyup', toggleButton);

function toggleButton () {
  if ($ideaTitle.val() === "" && $ideaBody.val() === "") {
    $ideaSave.prop("disabled", true);
  } else {
    $ideaSave.prop("disabled", false);
  }
}

function validateInput () {
  if ($ideaTitle.val() === "" || $ideaBody.val() === "") {
    alert("Please Enter Fillout The Title And Body Fields");
  } else {
    userInput();
  }
}

function userInput() {
  var ideaTitle = $ideaTitle.val();
  var ideaBody = $ideaBody.val();
  var newestIdea = new CardInfo(ideaTitle, ideaBody);
  cardCreater(newestIdea);
  objectToString(newestIdea);
  clearInputFields();
};

function clearInputFields() {
    $('.input').val('');
};

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
  localStorage.removeItem(id);
}

$anchor.on('click', function () {
  console.log('great idea');
  quality += 1;
  checkQuality ();
});

$anchor.on('click', function () {
  console.log('terrible idea');
  quality -= 1;
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