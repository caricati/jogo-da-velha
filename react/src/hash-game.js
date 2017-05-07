'use strict';

export default class HashGame {

  constructor(map) {
    this.stageGame = map;
  }

  // verifica se existe jogo na vertical
  isVertical() {
    let prev;

    for (let y = 0; y < this.stageGame.length; y++) {
      prev = 0;
      for (let x = 0; x < this.stageGame[y].length; x++) {
        if (this.stageGame[y][x] === null || prev && prev !== this.stageGame[y][x]) {
          break; // vá para proxima linha...
        }

        // se estamos no final, e todos sobreviveram ao break
        // temos então um fim de jogo ;)
        if(this.stageGame[y].length === x + 1) {
          return true;
        }

        prev = this.stageGame[y][x];
      }
    }

    return false;
  }

  // verifica se existe jogo na horizontal
  isHorizontal() {
    let prev;

    for (let x = 0; x < this.stageGame[0].length; x++) {
      prev = 0;
      for (let y = 0; y < this.stageGame.length; y++) {
        if(this.stageGame[y][x] === null || prev && prev !== this.stageGame[y][x]) {
          break;
        }
        // se estamos no final, e todos sobreviveram ao break
        // temos então um fim de jogo ;)
        if(this.stageGame[y].length === y + 1) {
          return true;
        }

        prev = this.stageGame[y][x];
      }
    }
    return false;
  }


  // verifica as diagonais do jogo
  isDiagonal() {
    let prev;
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (this.stageGame[i][i] === null || prev && this.stageGame[i][i] !== prev) {
        break;
      }

      if (this.stageGame[i][i] === prev && i === 2) {
        return true;
      }

      prev = this.stageGame[i][i];
    }

    prev = undefined;

    for (let i = 2; i >= 0; i--) {
      if (this.stageGame[count][i] === null || prev && this.stageGame[count][i] !== prev) {
        break;
      }

      if (this.stageGame[count][i] === prev && i === 0) {
        return true;
      }

      prev = this.stageGame[count][i];
      count++;
    }

    return false;
  }

  // verifica as possiveis combinações do jogo
  isGameOver(map) {
    if (map) {
      this.stageGame = map;
    }
    return this.isVertical() || this.isHorizontal() || this.isDiagonal();
  }
}