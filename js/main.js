'use strict';

var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var OBJECTS = 25;

var usersPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
document.querySelector('.big-picture').classList.remove('hidden');


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComments() {
  var arrayOfComments = [];

  for (i = 0; i < getRandomInt(1, 10); i++) {
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

for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(createPicture(pictures[i]));
}


usersPictures.appendChild(fragment);


function renderPictureElements() {
  for (i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
}

renderPictureElements();

var picturesList = document.querySelector('.pictures');
picturesList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img');
var bigPictureCaption = bigPicture.querySelector('.social__caption');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureCommentsBlock = bigPicture.querySelector('.social__comments');
bigPicture.classList.remove('hidden');

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
  bigPictureImage.src = pictures.url;
  bigPictureCaption.textContent = picture.description;
  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureCommentsBlock.appendChild(createComment(picture));
}

renderOpenedPicture(pictures[0]);

var commentsCount = bigPicture.querySelector('.social__comment-count');
commentsCount.classList.add('hidden');

var commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

document.body.classList.add('modal-open');
