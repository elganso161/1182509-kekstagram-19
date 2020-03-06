'use strict';

(function () {
  var dialogHandler = document.querySelector('.effect-level__line');
  var setup = document.querySelector('.effect-level__pin');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var dragged = false;

    var MouseMoveHendler = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var MouseUpHendler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHendler);
      document.removeEventListener('mouseup', MouseUpHendler);

      if (dragged) {
        var clickPreventDefaultHendler = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', clickPreventDefaultHendler);
        };
        dialogHandler.addEventListener('click', clickPreventDefaultHendler);
      }
    };

    document.addEventListener('mousemove', MouseMoveHendler);
    document.addEventListener('mouseup', MouseUpHendler);
  });
})();
