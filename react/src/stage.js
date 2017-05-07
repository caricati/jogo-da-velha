'use strict';

import React from 'react';
import WhoPlay from './who-play';
import Game from './game';

export default class Stage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      player1: '',
      player2: '',
      init: false
    };
  }

  initGame(players) {
    this.setState(players);
    this.setState({
      init: true
    })
  }

  steps() {
    if (this.state.init) {
      return <Game player1={this.state.player1} player2={this.state.player2} />;
    }
    return <WhoPlay handleGame={this.initGame.bind(this)} />
  }

  render() {
    return (
      <main>
        { this.steps() }
      </main>
    );
  }
}