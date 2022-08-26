/* REAL TIME EDITOR */

window.onload = function() {

    var iframe = document.querySelector("iframe");
    var code_areas = document.querySelectorAll('textarea');
  
    // For all TextArea
    for (var n = code_areas.length - 1; n >= 0; n--) {

      if (code_areas[n].addEventListener) {

        code_areas[n].addEventListener('input', function() {

          //n: 0 HTML, 1 JS, 2 CSS
          iframe.srcdoc =   code_areas[0].value +
                          '<style>' +
                            code_areas[2].value +
                          '</style>' +
                          '<script>' +
                            code_areas[1].value +
                          '<\/script>';
          }, false);

      }

    }
  }


/* RESIZABLE */

document.addEventListener('DOMContentLoaded', function () {
  // Query element
  const resizer = document.getElementById('dragSide');
  const leftSide = resizer.previousElementSibling;
  const rightSide = resizer.nextElementSibling;

  // Mouse position
  let x = 0;
  let y = 0;
  let leftWidth = 0;

  // mousedown event (when user drags the resizer)
  const mouseDownHandler = function (e) {
      // Get current mouse position
      x = e.clientX;
      y = e.clientY;
      leftWidth = leftSide.getBoundingClientRect().width;

      // Attach listeners to 'document'
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
      leftSide.style.width = `${newLeftWidth}%`;

      resizer.style.cursor = 'col-resize';
      document.body.style.cursor = 'col-resize';

      leftSide.style.userSelect = 'none';
      leftSide.style.pointerEvents = 'none';

      rightSide.style.userSelect = 'none';
      rightSide.style.pointerEvents = 'none';

      document.getElementById('codebar').innerHTML = 'It was a dark and stormy night…';
  };

  const mouseUpHandler = function () {
      resizer.style.removeProperty('cursor');
      document.body.style.removeProperty('cursor');

      leftSide.style.removeProperty('user-select');
      leftSide.style.removeProperty('pointer-events');

      rightSide.style.removeProperty('user-select');
      rightSide.style.removeProperty('pointer-events');

      // Remove handlers
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
  };

  // Attach handler
  resizer.addEventListener('mousedown', mouseDownHandler);
});