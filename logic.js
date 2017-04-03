$(document).ready(function(){
  var boardData  = {
    row1: ['', '', ''],
    row2: ['', '', ''],
    row3: ['', '', '']
  }
  var symbol = 'X';

  // Event handler below writes X or O in box when clicked 
  // if box does not already contain X or O

  $(".box").click(function() {
    console.log($(this))
    var textInBox = $(this).text();
    if (textInBox === '') {
      $(this).text(symbol);
      if (symbol === "X") {
        symbol = "O";
      } else {
        symbol = "X";
      }
    }
  });

  // Restarts game, sets symbol back to "X"

  $("#button-restart").click(function() {
    $(".box").text('');
    symbol = "X";
  });


})