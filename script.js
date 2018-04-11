$ideaTitle = $('.title-input');
$ideaBody = $('.body-input');
$ideaSave = $('.save-button');
$ideaSearch = $('.search-input');
$cardContainer = $('.card-container');
$showCompletedBtn = $('.show-completed-button');

var array = [];


$ideaSave.on('click', validateInput);
$ideaTitle.on('keyup', toggleButton);
$ideaBody.on('keyup', toggleButton);
$cardContainer.on('click', 'article .delete-button', deleteCard);
$cardContainer.on('click', 'article .upvote-button', upVote);
$cardContainer.on('click', 'article .downvote-button', downVote);
$cardContainer.on('blur', 'article .card-title', editTitle);
$cardContainer.on('blur', 'article .card-body', editBody);
$cardContainer.on('click', 'article .mark-complete', markAsComplete);
$ideaSearch.on('keyup', trueOrFalse);
$showCompletedBtn.on('click', showCompleted);

function CardInfo (object) {
  this.title = object.title;
  this.body = object.body;
  this.importance = object.importance || 'none';
  this.id = object.id
  this.completed = object.completed || null;
};

function validateInput () {
  if ($ideaTitle.val() === "" || $ideaBody.val() === "") {
    alert("Please Enter Fillout The Title And Body Fields");
  } else {
    getUserInput();
  }
}

function getUserInput() {
  var title = $ideaTitle.val();
  var body = $ideaBody.val();
  var id = Date.now();
  var importance = 'none';
  var object = new CardInfo({id: id, title: title, body: body, importance: importance, completed: null});
  cardPrepend(object);
  sendToLocalStorage(object);
  resetForm();
};

function toggleButton () {
  if ($ideaTitle.val() === "" && $ideaBody.val() === "") {
    $ideaSave.prop("disabled", true);
  } else {
    $ideaSave.prop("disabled", false);
  }
}

function resetForm() {
    $('.input').val('');
    $ideaTitle.focus();
    toggleButton();
};

function cardPrepend(object) {
  $cardContainer.prepend(`
    <article id=${object.id} class="card ${object.completed}">
      <h2 contenteditable="true" class="card-title">${object.title}</h2>
      <label for="checkbox">
      <input id="checkbox" type="checkbox" name="mark as complete box" class="mark-complete">complete
      </label>
      <input type="button" name="delete button" class="delete-button">
      <p contenteditable="true" class="card-body">${object.body}</p>
      <input type="button" class="upvote-button">
      <input type="button" class="downvote-button">
      <h3 class="importance">importance:
        <span class="importance-text">${object.importance}</span>
      </h3>
    </article>`);
};

function sendToLocalStorage(object) {
  var string = JSON.stringify(object);
  localStorage.setItem(object.id, string);
}

function pullFromLocalStorage(that) {
  var id = $(that).closest('article').attr('id');
  string = localStorage.getItem(id);
  object = JSON.parse(string);
};

function upVote() {
  pullFromLocalStorage(this);
  var importance = $(this).siblings($('h3')).children($('span'));
  var text = importance.text();
  qualityCheckUp(importance,text);
  sendToLocalStorage(object);
};

function qualityCheckUp(importance,text) {
  if (text.includes('none')) {
      importance.text('low');
      importance = $(this).siblings($('h3')).children($('span')).text('low')
      object.importance = 'low';
  } else if (text.includes('low')) {
      importance.text('normal');
      importance = $(this).siblings($('h3')).children($('span')).text('normal')
      object.importance = 'normal';
  } else if (text.includes('normal')) {
      importance.text('high');
      importance = $(this).siblings($('h3')).children($('span')).text('high')
      object.importance = 'high';
  } else {
      importance.text('critical');
      importance = $(this).siblings($('h3')).children($('span')).text('critical')
      object.importance = 'critical';
  };
};

function downVote() {
  pullFromLocalStorage(this);
  var importance = $(this).siblings($('h3')).children($('span'));
  var text = importance.text();
  qualityCheckDown(importance,text);
  sendToLocalStorage(object);
};

function qualityCheckDown(importance,text) {
  if (text.includes('critical')) {
      importance.text('high');
      importance = $(this).siblings($('h3')).children($('span')).text('high')
      object.importance = 'high';   
  } else if (text.includes('high')) {
      importance.text('normal');
      importance = $(this).siblings($('h3')).children($('span')).text('normal')
      object.importance = 'normal';
  } else if (text.includes('normal')) {
      importance.text('low');
      importance = $(this).siblings($('h3')).children($('span')).text('low')
      object.importance = 'low';
  } else {
      importance.text('none');
      importance = $(this).siblings($('h3')).children($('span')).text('none')
      object.importance = 'none';
  };
};

function  searchLocalStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var result = localStorage.getItem(localStorage.key(i));
    var object = JSON.parse(result);
      if (object.title.includes($ideaSearch.val()) || object.body.includes($ideaSearch.val())) {
        cardPrepend(object);
      };
  };    
};

function trueOrFalse() {
  $cardContainer.html('');

  if ($ideaSearch.val()) {

    searchLocalStorage();

  } else if ($ideaSearch.val() === '') {
        onPageLoad();
  } else {
    return;
  };
};

function editTitle() {
  var title = $(this).text();
  pullFromLocalStorage(this);
  object.title = title;
  sendToLocalStorage(object);
};

function editBody() {
  var body = $(this).text();
  pullFromLocalStorage(this);
  object.body = body;
  sendToLocalStorage(object);
};

function trueOrFalse() {
  $cardContainer.html('');
  if ($ideaSearch.val()) {
    searchLocalStorage();
  } else if ($ideaSearch.val() === '') {
    onPageLoad();
  } else {
    return;
  };
};

function markAsComplete() {
  var $toDo = $(this).closest('article');
  pullFromLocalStorage(this);
  $toDo.toggleClass('completed');
  if (object.completed === null) {
    object.completed = 'completed';
  } else {
    object.completed = null;
  };
  sendToLocalStorage(object);
};

function showCompleted(event) {
  event.preventDefault();
  for (var i = 0; i < localStorage.length; i++) {
    var string = localStorage.getItem(localStorage.key(i));
    var object = JSON.parse(string);
    if (object.completed === 'completed') {
        array.push(object);
    };
  };
  sortObjectDecending(object);
  arrayForLoop(array);
};

function sortObjectDecending(object) {
    array.sort(function(a,b) {
   return a-b;
   });
};

function arrayForLoop(array) {
  for (var i = 0; i < array.length; i++) {
    cardPrepend(array[i]);
  };
};


function deleteCard(id) {
  $(this).closest('article').remove()
  deleteCardStorage(this);
};

function deleteCardStorage(that) {
  var id = $(that).closest('article').attr('id');
  localStorage.removeItem(id);   
};

function onPageLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var string = localStorage.getItem(localStorage.key(i));
    var object = JSON.parse(string);
    if (object.completed === null) {
    cardPrepend(object);
    };
  };
};

onPageLoad();


