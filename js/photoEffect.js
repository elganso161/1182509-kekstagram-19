'use strict';

(function () {
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
})();
