'use strict';

(function () {
  var lineRange = document.querySelector('.effect-level__line');
  var pinRange = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__depth');


  pinRange.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var shiftX = evt.clientX - pinRange.getBoundingClientRect().left;


    var startCoords = {
      x: evt.clientX
    };

    var dragged = false;

    var MouseMoveHendler = function (moveEvt) {
      moveEvt.preventDefault();

      var newLeft = moveEvt.clientX - shiftX - lineRange.getBoundingClientRect().left;
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = lineRange.offsetWidth - pinRange.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      pinRange.style.left = newLeft + 'px';

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      pinRange.style.left = (pinRange.offsetLeft - shift.x) + 'px';
      effectLevel.style.width = pinRange.offsetLeft + 'px';
    };

    var MouseUpHendler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHendler);
      document.removeEventListener('mouseup', MouseUpHendler);

      if (dragged) {
        var clickPreventDefaultHendler = function (clickEvt) {
          clickEvt.preventDefault();
          lineRange.removeEventListener('click', clickPreventDefaultHendler);
        };
        lineRange.addEventListener('click', clickPreventDefaultHendler);
      }
    };

    document.addEventListener('mousemove', MouseMoveHendler);
    document.addEventListener('mouseup', MouseUpHendler);
  });
})();

