 todoBox(); 

function todoBox(){
  $todoTitle = $('.title-input');
  $todoBody = $('.body-input');
  $todoSave = $('.save-button');
  $todoSearch = $('.search-input');
  $cardContainer = $('.card-container');
  $showCompletedBtn = $('.show-completed');
  $importanceBtn = $('.toDo-buttons');
  $titleCharacterCount = $('.title-character-count');
  $bodyCharacterCount = $('.body-character-count');

  var array = [];
  var titleLength = 0;
  var bodyLength= 0;


  $todoSave.on('click', validateInput);
  $todoTitle.on('keyup', toggleButton);
  $todoBody.on('keyup', toggleButton);
  $todoTitle.on('keyup', disableButton);
  $todoBody.on('keyup', disableButton);
  $cardContainer.on('click', 'article .delete-button', deleteCard);
  $cardContainer.on('click', 'article .upvote-button', upVote);
  $cardContainer.on('click', 'article .downvote-button', downVote);
  $cardContainer.on('blur', 'article .card-title', editTitle);
  $cardContainer.on('blur', 'article .card-body', editBody);
  $cardContainer.on('click', 'article .mark-complete', markAsComplete);
  $todoSearch.on('keyup', trueOrFalse);
  $showCompletedBtn.on('click', showCompleted);
  $importanceBtn.on('click', sortByImportance);
  $titleCharacterCount.on('keyup', titleCharacterCount);
  $bodyCharacterCount.on('keyup', bodyCharacterCount);

  function CardInfo (object) {
    this.title = object.title;
    this.body = object.body;
    this.importance = object.importance || 'none';
    this.id = object.id
    this.completed = object.completed || null;
  };

  function validateInput () {
    if ($todoTitle.val() === "" || $todoBody.val() === "") {
      alert("Please Enter Title And Body");
    } else {
      getUserInput();
    }
  }

  function getUserInput() {
    var title = $todoTitle.val();
    var body = $todoBody.val();
    var id = Date.now();
    var importance = 'none';
    var object = new CardInfo({id: id, title: title, body: body, importance: importance, completed: null});
    cardPrepend(object);
    sendToLocalStorage(object);
    resetForm();
  };

  function toggleButton () {
    if ($todoTitle.val() === "" && $todoBody.val() === "") {
      $todoSave.prop("disabled", true);
    } else {
      $todoSave.prop("disabled", false);
    };
  };

  function resetForm() {
      $('.input').val('');
      $todoTitle.focus();
      toggleButton();
  };

  function cardPrepend(object) {
    $cardContainer.prepend(`
      <article id=${object.id} class="card ${object.completed}">
        <h2 contenteditable="true" class="card-title">${object.title}</h2>
        <label for="checkbox">
        <input id="checkbox" type="checkbox" role="checkbox" name="mark as complete box" class="mark-complete">complete
        </label>
        <input type="button" aria-label="delete" name="delete button" class="delete-button">
        <p contenteditable="true" class="card-body">${object.body}</p>
        <input type="button" aria-label="upvote" class="upvote-button">
        <input type="button" aria-label="downvote" class="downvote-button">
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
        if (object.title.includes($todoSearch.val()) || object.body.includes($todoSearch.val())) {
          cardPrepend(object);
        };
    };    
  };

  function trueOrFalse() {
    $cardContainer.html('');

    if ($todoSearch.val()) {

      searchLocalStorage();

    } else if ($todoSearch.val() === '') {
          onPageLoad();
    } else {
      return;
    };
  };

  function sortByImportance() {
    var value = $(this).text().toLowerCase();
    
    $('.card-container article').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
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
    if ($todoSearch.val()) {
      searchLocalStorage();
    } else if ($todoSearch.val() === '') {
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
    array = [];
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
    var array = [];
    for (var i = 0; i < localStorage.length; i++) {
      var string = localStorage.getItem(localStorage.key(i));
      var object = JSON.parse(string);
      array.push(object)

      if (array.length < 11 && object.completed === null) {
        cardPrepend(object);
      };
    };
  };

  function titleCharacterCount() {
    titleLength = parseInt($(this).val().length);
    titleLength++;
    $('#title-chars').text(titleLength);

      if (titleLength > 99) {
        alert('character limit reached')
      };
  };

  function bodyCharacterCount() {
    bodyLength = parseInt($(this).val().length);
    bodyLength++;
    $('#body-chars').text(bodyLength);

      if (bodyLength > 99) {
        alert('character limit reached')
      };
  };

  function disableButton() {
    if (titleLength > 99) {
      $todoSave.prop("disabled", true);
    } else {
      $todoSave.prop("disabled", false);
    };
  };
  onPageLoad();
};


