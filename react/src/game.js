'use strict';

import React from 'react';
import HashGame from './hash-game';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stageGame: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ],
      current: 'x',
      currentName: props.player1,
      isGameOver: false
    };
    this.hashGame = new HashGame();
  }

  clickCell(e) {
    let el = e.target;
    let isGameOver;

    let row = el.getAttribute('data-row');
    let cell = el.getAttribute('data-cell');

    if (e.target.innerHTML || this.state.isGameOver) {
      return; // já foi preenchido.
    }

    this.state.stageGame[row][cell] = this.state.current;
    
    if (this.hashGame.isGameOver(this.state.stageGame)) {
      this.setState({
        isGameOver: true
      });
      return alert(`Fim de Jogo!\n${this.state.currentName.toUpperCase()}, ganhou essa partida!`);
    }
    
    this.togglePlayer();
  }

  togglePlayer() {
    let current;
    let currentName;

    if (this.state.current === 'x') {
      current = 'o';
      currentName = this.props.player2;
    }
    else {
      current = 'x';
      currentName = this.props.player1;
    }

    this.setState({ current, currentName });
  }

  resetStage() {
    this.setState({
      isGameOver: false,
      stageGame: [
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ]
    });
  }

  render() {
    let rows = [];

    // construção da grid
    this.state.stageGame.map((row, rowIndex) => {
      let cells = [];
      row.map((cell, cellIndex) => {
        cells.push(
          <div className="col" data-cell={cellIndex} data-row={rowIndex} key={cellIndex} onClick={ (e) => this.clickCell(e) }>
            { this.state.stageGame[rowIndex][cellIndex] }
          </div>
        );
      });

      rows.push(
        <div className="row" key={rowIndex}>
          { cells }
        </div>
      );
    });

    return (
      <main>
        <section id="first-step" className="steps">
          <header>
            <h1>Jogo da Velha</h1>
            <p>Jogador da vez: { this.state.currentName } ({ this.state.current })</p>
          </header>

          <div id="stage">
            { rows }
          </div>

          <footer>
            <button type="button" id="reset" onClick={ (e) => this.resetStage(e) }>Reiniciar</button>
          </footer>
        </section>
      </main>
    );
  }
}