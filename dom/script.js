(function(){
  'use strict';

  var stageGame = [];

  var player1;
  var player2;
  var currentPlayer = 'x';

  var gameOver = false;

  window.addEventListener('load', function(){
    var btnReset = document.getElementById('reset');
    clearStage();

    document.querySelector('.steps').classList.remove('hide');
    document.getElementById('next-step').addEventListener('click', initGameStep);

    btnReset.addEventListener('click', resetGame);
    _selector('#stage .row .col', function(el){
      el.addEventListener('click', onClickBlock);
    });
  });

  function initGameStep() {
    var playerName1 = document.querySelector('input[name=player1]').value;
    var playerName2 = document.querySelector('input[name=player2]').value;
    var firstStep = document.getElementById('first-step');
    var lastStep = document.getElementById('last-step');

    if(playerName1 && playerName2) {
      player1 = playerName1;
      player2 = playerName2;
      bindCurrentPlayer();
      firstStep.classList.add('hide');
      lastStep.classList.remove('hide');
    }
    else {
      alert('Por favor, informe o nome dos jogadores.');
    }
  }

  function onClickBlock(e) {
    var message;
    var parent = this.parentNode;
    var y = Number(parent.getAttribute('data-index'));
    var x; //hosing

    // já existe um item preenchido ou acabou o jogo?
    if (this.childNodes.length || gameOver) {
      return false;
    }

    for (var i = 0; i < parent.children.length; i++) {
      // index da coluna que foi cliada (var i).
      if (parent.children[i] === this) {
        x = i;
      }
    }

    stageGame[y][x] = currentPlayer;
    bindGrid();

    if (gameOver = checkGameOver()) {
      message = 'Fim de Jogo!\n';
      message += currentPlayer == 'x' ? player1 : player2;
      message += ', ganhou essa partida!'
      alert(message);
    }
    else {
      toggleCurrentPlayer();
    }
  }

  function bindGrid() {
    _selector('#stage .row', function(row, y){
      row.querySelectorAll('.col').forEach(function(col, x){
        if (stageGame[y][x] === 0) {
          col.innerHTML = '';
        }
        else {
          col.innerHTML = stageGame[y][x];
        }
      });
    })
  }

  function bindCurrentPlayer() {
    var currentPlayerName = '';
    if (currentPlayer === 'x') {
      currentPlayerName = player1 + ' ('+currentPlayer+').' 
    }
    else {
      currentPlayerName = player2 + ' ('+currentPlayer+').' 
    }

    document.getElementById('current-player').innerHTML = currentPlayerName;
  }

  function toggleCurrentPlayer() {
    currentPlayer = (currentPlayer === 'x') ? 'o': 'x';
    bindCurrentPlayer();
  }

  function clearStage() {
    stageGame = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    bindGrid();
  }

  function resetGame () {
    gameOver = false;
    clearStage();
  }

  function checkGameOver() {
    var isVertical = (function(){
      var prev;

      for (var y = 0; y < stageGame.length; y++) {
        prev = 0;
        for (var x = 0; x < stageGame[y].length; x++) {
          if (stageGame[y][x] === 0 || prev && prev !== stageGame[y][x]) {
            break; // vá para proxima linha...
          }

          // se estamos no final, e todos sobreviveram ao break
          // temos então um fim de jogo ;)
          if(stageGame[y].length === x + 1) {
            return true;
          }

          prev = stageGame[y][x];
        }

      }
      return false;
    }());

    var isHorizontal = (function(){
      var prev;

      for (var x = 0; x < stageGame[0].length; x++) {
        prev = 0;
        for (var y = 0; y < stageGame.length; y++) {
          if(stageGame[y][x] == 0 || prev && prev !== stageGame[y][x]) {
            break;
          }
          // se estamos no final, e todos sobreviveram ao break
          // temos então um fim de jogo ;)
          if(stageGame[y].length === y + 1) {
            return true;
          }

          prev = stageGame[y][x];
        }
      }
      return false;
    }());

    var isDiagonal = (function(){
      var prev;
      var count = 0;
      for (var i = 0; i < 3; i++) {
        if (stageGame[i][i] === 0 || prev && stageGame[i][i] !== prev) {
          break;
        }

        if (stageGame[i][i] === prev && i === 2) {
          return true;
        }

        prev = stageGame[i][i];
      }

      prev = undefined;

      for (var i = 2; i >= 0; i--) {
        if (stageGame[count][i] === 0 || prev && stageGame[count][i] !== prev) {
          break;
        }

        if (stageGame[count][i] === prev && i === 0) {
          return true;
        }

        prev = stageGame[count][i];
        count++;
      }

      return false;
    }());

    return isVertical || isHorizontal || isDiagonal;
  }

  function _selector(selector, callback) {
    if(selector === HTMLElement) {
      return selector.forEach(callback)
    }
    document.querySelectorAll(selector).forEach(callback);
  }
}());