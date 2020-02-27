'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var OBJECTS = 25;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var usersPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComments() {
  var arrayOfComments = [];

  for (var i = 0; i < getRandomInt(1, 10); i++) {
    arrayOfComments.push({
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: generateMessage(MESSAGES),
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    });
  }

  return arrayOfComments;
}


function generateMessage(array) {
  var arrayMessages = array.slice();
  if (getRandomInt(0, 1) === 0) {
    var randomMassage = getRandomInt(0, arrayMessages.length - 1);
    return arrayMessages[randomMassage];
  } else {
    var numberFirstRandomMessage = getRandomInt(0, arrayMessages.length - 1);
    var firstRandomMessage = arrayMessages[numberFirstRandomMessage];

    arrayMessages.splice(numberFirstRandomMessage, 1);

    var numberSecondRandomMessage = getRandomInt(0, arrayMessages.length - 1);
    var secondRandomMessage = arrayMessages[numberSecondRandomMessage];
    return firstRandomMessage + ' ' + secondRandomMessage;
  }
}

function createArrayOfObjects(countObjects) {
  var arr = [];

  for (var i = 0; i < countObjects; i++) {
    arr.push({'url': 'photos/' + (i + 1) + '.jpg', 'description': 'Лучшее фото на свете!', 'likes': getRandomInt(15, 200), 'comments': getComments()});
  }

  return arr;
}

var pictures = createArrayOfObjects(OBJECTS);

var createPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;

};

var fragment = document.createDocumentFragment();


usersPictures.appendChild(fragment);


function renderPictureElements() {
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
}

renderPictureElements();

var picturesList = document.querySelector('.pictures');
picturesList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
var bigPictureCaption = bigPicture.querySelector('.social__caption');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
// bigPicture.classList.remove('hidden');

var commentTemplate = bigPictureCommentsBlock.querySelector('.social__comment');


function createComment(photo) {
  var comment = commentTemplate.cloneNode(true);
  var picture = comment.querySelector('.social__picture');
  var commentContent = comment.querySelector('.social__text');

  picture.src = photo.url;
  picture.alt = photo.comments[0].name;
  commentContent.textContent = photo.comments[0].message;

  return comment;
}


function renderOpenedPicture(picture) {
  bigPictureImage.src = picture.url;
  bigPictureCaption.textContent = picture.description;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureCommentsBlock.appendChild(createComment(picture));
}

renderOpenedPicture(pictures[0]);

// Добавляет возможность просмотра любой фотографии в полноразмерном режиме;
var thumbnails = document.querySelectorAll('.picture__img');
var closeBigPicture = document.querySelector('.big-picture__cancel');


var addThumbnailClickHandler = function (thumbnail, picture) {
  thumbnail.addEventListener('click', function () {
    bigPictureImage.src = picture.url;
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
  thumbnail.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      bigPictureImage.src = picture.url;
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  });
  closeBigPicture.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });
  closeBigPicture.addEventListener('click', function () {
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      bigPicture.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      document.body.classList.remove('modal-open');
    }
  });
};

for (i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], pictures[i]);
}


var commentsCount = bigPicture.querySelector('.social__comment-count');
commentsCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');


var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var closeUploadOverlay = document.querySelector('.cancel');


uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeUploadOverlay.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    imgUploadOverlay.classList.add('hidden');
  }
});

closeUploadOverlay.addEventListener('click', function () {
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY) {
    document.body.classList.remove('modal-open');
  }
});


var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var oneStep = 25;

scaleControlValue.value = '100%';
imgUploadPreview.style.transform = 'scale(1)';


scaleControlSmaller.addEventListener('click', function () {
  if ((parseInt(scaleControlValue.value, 10) - oneStep) <= oneStep) {
    imgUploadPreview.style.transform = 'scale(' + 0.25 + ')';
    scaleControlValue.value = '25%';
  } else {
    imgUploadPreview.style.transform = 'scale(' + ((parseInt(scaleControlValue.value, 10) - oneStep) / 100) + ')';
    scaleControlValue.value = (parseInt(scaleControlValue.value, 10) - oneStep) + '%';
  }
});

scaleControlBigger.addEventListener('click', function () {
  if ((parseInt(scaleControlValue.value, 10) + oneStep) >= 100) {
    imgUploadPreview.style.transform = 'scale(' + 1 + ')';
    scaleControlValue.value = '100%';
  } else {
    imgUploadPreview.style.transform = 'scale(' + ((parseInt(scaleControlValue.value, 10) + oneStep) / 100) + ')';
    scaleControlValue.value = (parseInt(scaleControlValue.value, 10) + oneStep) + '%';
  }
});


var currentEffect = 'none';

var pinForm = document.querySelector('.img-upload__effect-level');
var effectPin = pinForm.querySelector('.effect-level__pin');
var levelValue = document.querySelector('.effect-level__value');
var levelLine = pinForm.querySelector('.effect-level__line');

effectPin.addEventListener('mouseup', function () {

  var firstPoint = effectPin.offsetLeft;
  var computedStyle = getComputedStyle(levelLine);
  var scaleWidth = parseInt(computedStyle.width, 10);
  levelValue.value = (Math.floor((firstPoint * 100) / scaleWidth));
});


var effects = document.querySelectorAll('.effects__label');
var imgEffect = imgUploadPreview.querySelector('img');


for (var i = 0; i < effects.length; i++) {

  effects[i].addEventListener('click', function (evt) {
    var newEffect = evt.target.classList.item(1);

    imgEffect.classList.remove(currentEffect);
    currentEffect = newEffect;

    imgEffect.classList.add(newEffect);

    var formula = function (beggining, end) {
      return beggining + (end / 100) * levelValue.value;
    };

    if (newEffect === 'effects__preview--chrome') {
      imgEffect.style.filter = 'grayscale(' + formula(0, 1) + ')';
    }

    if (newEffect === 'effects__preview--sepia') {
      imgEffect.style.filter = ('sepia(' + formula(0, 1) + ')');
    }

    if (newEffect === 'effects__preview--marvin') {
      imgEffect.style.filter = ('invert(' + formula(0, 100) + '%' + ')');
    }

    if (newEffect === 'effects__preview--phobos') {
      imgEffect.style.filter = ('blur(' + formula(0, 3) + 'px' + ')');
    }

    if (newEffect === 'effects__preview--heat') {
      imgEffect.style.filter = ('brightness(' + formula(1, 3) + ')');
    }

    if (newEffect === 'effects__preview--none') {
      pinForm.classList.add('hidden');
    } else {
      pinForm.classList.remove('hidden');
    }
  });
}

// Валидация хеш-тегов
var modalHash = document.querySelector('.text__hashtags');
var maxHashtags = 5;
var maxSymbols = 20;

modalHash.addEventListener('input', function (evt) {
  var invalidMessage = [];
  var target = evt.target;


  var inputText = modalHash.value.toLowerCase().trim();

  var inputArray = inputText.split(/\s+/);

  var isStartNoHashing = inputArray.some(function (item) {
    return item[0] !== '#';
  });

  var isOnlyLaticeHashing = inputArray.some(function (item) {
    return item === '#';
  });

  var isManySymbolsHashing = inputArray.some(function (item) {
    return item.length > maxSymbols;
  });

  var isNoSpaceHashing = inputArray.some(function (item) {
    return item.indexOf('#', 1) >= 1;
  });

  var isSomeSpecialSymbols = inputArray.some(function (item) {
    return item.slice(1).match(/^\w+$/);
  });

  if (!inputText) {
    return;
  }
  if (inputArray.length === 0) {
    return;
  }

  if (isStartNoHashing) {
    invalidMessage.push('Хэштэг должен начинаться с "#"!');
  }
  if (isOnlyLaticeHashing) {
    invalidMessage.push('Хэштэг не должен состоять только из "#"!');
  }
  if (inputArray.length > maxHashtags) {
    invalidMessage.push('Не более пяти хэштэгов!');
  }
  if (isManySymbolsHashing) {
    invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку!');
  }

  if (isNoSpaceHashing) {
    invalidMessage.push('Хэштэги должны разделяться пробелами!');
  }

  var isRepeatHashing = inputArray.some(function (item, j, arr) {
    return arr.indexOf(item, j + 1) >= j + 1;
  });
  if (isRepeatHashing) {
    invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды!');
  }

  if (!isSomeSpecialSymbols) {
    invalidMessage.push('Хэштэг не может содержать спецсимволы!');
  }

  target.setCustomValidity(invalidMessage.join('\n'));

});

