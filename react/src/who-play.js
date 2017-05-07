'use strict';

import React from 'react';

export default class WhoPlay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player1: '',
      player2: ''
    };
  }

  submit() {
    if (this.state.player1 && this.state.player2) {
      this.props.handleGame({
        player1: this.state.player1,
        player2: this.state.player2
      });
    }
    else {
      alert('Por favor, informe o nome dos jogadores.');
    }
  }

  handleChangeP1(e) {
    this.setState({ 
      player1: e.target.value
    });
  }

  handleChangeP2(e) {
    this.setState({ 
      player2: e.target.value
    });
  }

  render() {
    return (
      <section className="steps">
        <header>
          <h1>Jogo da Velha (React)</h1>
          <p>Informe os nomes dos jogadores:</p>
        </header>

        <div className="input-group">
          <input type="text" name="player1" placeholder="Jogador 1" value={ this.state.player1 } onChange={ this.handleChangeP1.bind(this) } />
          <input type="text" name="player2" placeholder="Jogador 2" value={ this.state.player2 } onChange={ this.handleChangeP2.bind(this) } />
        </div>
        <button type="button" onClick={ (e) => this.submit(e) }>Iniciar o jogo</button>
      </section>
    );
  }
}