'use strict';

(function () {
  var lineRange = document.querySelector('.effect-level__line');
  var pinRange = document.querySelector('.effect-level__pin');
  // var effectLevel = document.querySelector('.effect-level__depth');

  pinRange.onmousedown = evt => {
    var value = evt.pageX - lineRange.offsetLeft - (pinRange.offsetWidth / 2);
    var moveAt = value => {
      pinRange.style.left = value + 'px';
    }
    document.onmousemove = evt => {
        value = evt.pageX - lineRange.offsetLeft - (pinRange.offsetWidth / 2);
        if(value > 0 && value < 450 ){
            moveAt(value);
        }else{
            moveAt(value>0?450:0);
        }
    }
      document.onmouseup = () => {
        document.onmousemove = null;
        pinRange.onmouseup = null;
    }
}

  // pinRange.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX
  //   };

  //   var dragged = false;

  //   var MouseMoveHendler = function (moveEvt) {
  //     moveEvt.preventDefault();

  //     dragged = true;

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX
  //     };
  //     pinRange.style.left = (pinRange.offsetLeft - shift.x) + 'px';
  //   };

  //   var MouseUpHendler = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', MouseMoveHendler);
  //     // document.removeEventListener('mouseup', MouseUpHendler);

  //     if (dragged) {
  //       var clickPreventDefaultHendler = function (clickEvt) {
  //         clickEvt.preventDefault();
  //         lineRange.removeEventListener('click', clickPreventDefaultHendler);
  //       };
  //       lineRange.addEventListener('click', clickPreventDefaultHendler);
  //     }
  //   };

  //   document.addEventListener('mousemove', MouseMoveHendler);
  //   document.addEventListener('mouseup', MouseUpHendler);
  // });
})();

