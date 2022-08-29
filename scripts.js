/***** REAL TIME EDITOR *****/

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


/***** COMBOBOX *****/

$("#language").change(function () {
  $('#snippet').empty().append($('<option></option>').val('Select Snippet').html('Select Snippet'));
  var matchVal = $("#language option:selected").text();
  a.Data.filter(function (data) {
      if (data.language == matchVal) {
          $("#snippet").append($('<option></option>').val(data.path).html(data.snippet));
      }
  });
});

$('#snippet').change(function () {
  //alert($(this).val());
  //var getsnippetval = $('#snippet').val();
  //console.log( $('#snippet').val() );
  localStorage.setItem("selected", $('#snippet').val());
  loadFiles($('#snippet').val());
});

/* SNIPPETS LOADER */
function loadFiles(_sel) {

  //localStorage.setItem("selected", null)

  const pref = ''; // for different path
  var HTMLfile = pref + 'snippets/' + _sel + '/index.html';
  var CSSfile = pref + 'snippets/' + _sel + '/style.css';
  var JSfile = pref + 'snippets/' + _sel + '/scripts.js';

  $.get(HTMLfile, function(HTML_data) {
    $('#__HTML').val(HTML_data);
    $.get(CSSfile, function(CSS_data) {
      $('#__CSS').val(CSS_data);
      $.get(JSfile, function(JS_data) {
        $('#__JS').val(JS_data);

        // Update iframe content on last file loaded
        var htmlTA = document.getElementById("__HTML")
        htmlTA.dispatchEvent(new Event('input', {bubbles:true}));
        var jsTA = document.getElementById("__JS")
        jsTA.dispatchEvent(new Event('input', {bubbles:true}));
        var cssTA = document.getElementById("__CSS")
        cssTA.dispatchEvent(new Event('input', {bubbles:true}));

      });
    });
  }); 

  //TODO can I load without execute it? now js is double executed


}

//TODO load if localStorage ?
try {
  var _selected = localStorage.getItem("selected");
  //loadFiles(_selected);
} catch (error) {
  
}


/***** RESIZABLE *****/

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