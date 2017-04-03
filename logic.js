$(document).ready(function(){
  var history = [];
  var boardData  = {
    row1: ['', '', ''],
    row2: ['', '', ''],
    row3: ['', '', '']
  }
  var symbol = 'X';
  updateMessage('Player ' + symbol + '\'s turn');

  // Event handler below writes X or O in box when clicked 
  // if box does not already contain X or O

  $(".box").click(function() {
    var textInBox = $(this).text();
    updateMessage('Player ' + symbol + '\'s turn');
    var boxID = $(this).attr('id');

    if (textInBox === '') {

      // update boardData 
      switch(Number(boxID)) {
        case 0:
          boardData.row1[0] = symbol;
          break;
        case 1:
          boardData.row1[1] = symbol;
          break;
        case 2:
          boardData.row1[2] = symbol;
          break;
        case 3:
          boardData.row2[0] = symbol;
          break;
        case 4:
          boardData.row2[1] = symbol;
          break;
        case 5:
          boardData.row2[2] = symbol;
          break;
        case 6:
          boardData.row3[0] = symbol;
          break;
        case 7:
          boardData.row3[1] = symbol;
          break;
        case 8:
          boardData.row3[2] = symbol;
          break;
      }

      // check for winning combos
      var thereIsAWinner = false;
      if (
          // horizontal win

          _.every(boardData.row1, function(box){return box === symbol}) ||
          _.every(boardData.row2, function(box){return box === symbol}) ||
          _.every(boardData.row3, function(box){return box === symbol}) ||

          // vertical win

          _.every([ boardData.row1[0], boardData.row2[0], boardData.row3[0] ],
            function(box){return box === symbol}) ||
          _.every([ boardData.row1[1], boardData.row2[1], boardData.row3[1] ],
            function(box){return box === symbol}) ||
          _.every([ boardData.row1[2], boardData.row2[2], boardData.row3[2] ],
            function(box){return box === symbol}) ||

          // diagonal win

          _.every([ boardData.row1[0], boardData.row2[1], boardData.row3[2] ], 
            function(box){return box === symbol}) ||
          _.every([ boardData.row1[2], boardData.row2[1], boardData.row3[0] ], 
            function(box){return box === symbol})
        ) {
        $(this).text(symbol);
        console.log('game was won')
        updateMessage('Player ' + symbol + ' won! Press the restart button to play again');
        thereIsAWinner = true;
      }

      console.log('boardData: ', boardData)

      if (!thereIsAWinner) {
        $(this).text(symbol);
        if (symbol === "X") {
          symbol = "O";
          updateMessage('Player ' + symbol + '\'s turn');
        } else {
          symbol = "X";
          updateMessage('Player ' + symbol + '\'s turn');
        }
      } else {
        thereIsAWinner = false;
      }
    }
  });

  // Restarts game, sets symbol back to "X"

  $("#button-restart").click(function() {
    $(".box").text('');
    symbol = "X";
    updateMessage('Player ' + symbol + '\'s turn');
    var newBoardDataArray = _.map(boardData, function(row){
      return row.map(function(box){
        return '';
      });
    });
    newBoardData = _.object(['row1', 'row2', 'row3'], newBoardDataArray);
    history.push(boardData)
    boardData = newBoardData;
  });

  function updateMessage(message) {
    $("#message").text(message);
  }

})