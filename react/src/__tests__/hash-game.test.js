'use strict';

import HashGame from '../hash-game';

test('HashGame should be defined.', () => {
  expect(HashGame).toBeDefined();
});


describe('Vertial game', () => {
  test('Should be not vertial game.', () => {
    let game = new HashGame([
      ['x', 'x', null],
      [null, 'x', 'x'],
      ['x', null, 'x']
    ]);
    expect(game.isVertical()).not.toBeTruthy();

    game = new HashGame([
      ['x', null, null],
      ['x', null, null],
      ['x', null, null]
    ]);
    expect(game.isVertical()).not.toBeTruthy();
  });

  test('Should be vertial game.', () => {
    let game = new HashGame([
      ['x', 'x', 'x'],
      [null, null, null],
      [null, null, null]
    ]);
    expect(game.isVertical()).toBeTruthy();

    game = new HashGame([
      [null, null, null],
      ['x', 'x', 'x'],
      [null, null, null]
    ]);
    expect(game.isVertical()).toBeTruthy();

    game = new HashGame([
      [null, null, null],
      [null, null, null],
      ['x', 'x', 'x']
    ]);
    expect(game.isVertical()).toBeTruthy();
  });
});

describe('Horizontal game', () => {
  // horizontal
  test('Should be not horizontal game.', () => {
    let game = new HashGame([
      ['x', 'x', null],
      [null, 'x', 'x'],
      ['x', null, 'x']
    ]);
    expect(game.isHorizontal()).not.toBeTruthy();

    game = new HashGame([
      ['x', 'x', 'x'],
      [null, null, null],
      [null, null, null]
    ]);
    expect(game.isHorizontal()).not.toBeTruthy();
  });

  test('Should be horizontal game.', () => {
    let game = new HashGame([
      ['x', null, null],
      ['x', null, null],
      ['x', null, null]
    ]);
    expect(game.isHorizontal()).toBeTruthy();

    game = new HashGame([
      [null, 'x', null],
      [null, 'x', null],
      [null, 'x', null]
    ]);
    expect(game.isHorizontal()).toBeTruthy();

    game = new HashGame([
      [null, null, 'x'],
      [null, null, 'x'],
      [null, null, 'x']
    ]);
    expect(game.isHorizontal()).toBeTruthy();
  });
});

describe('Diagonal game', () => {
  // diagonal
  test('Should be not diagonal game.', () => {
    let game = new HashGame([
      ['x', 'x', 'x'],
      ['x', null, null],
      ['x', null, 'x']
    ]);
    expect(game.isDiagonal()).not.toBeTruthy();

    game = new HashGame([
      ['x', null, 'x'],
      [null, 'x', null],
      [null, 'x', null]
    ]);
    expect(game.isDiagonal()).not.toBeTruthy();
  });

  test('Should be diagonal game.', () => {
    let game = new HashGame([
      ['x', null, null],
      [null, 'x', null],
      [null, null, 'x']
    ]);
    expect(game.isDiagonal()).toBeTruthy();

    game = new HashGame([
      [null, null, 'x'],
      [null, 'x', null],
      ['x', null, null]
    ]);
    expect(game.isDiagonal()).toBeTruthy();

    game = new HashGame([
      [null, null, 'x'],
      [null, 'x', 'x'],
      ['x', null, 'x']
    ]);
    expect(game.isDiagonal()).toBeTruthy();
  });
});

describe('Game over', () => {

  test('Should be success game over.', () => {
    let game = new HashGame([
      ['x', 'o', 'x'],
      ['x', 'o', 'o'],
      ['x', 'x', 'o']
    ]);
    expect(game.isGameOver()).toBeTruthy();

    game = new HashGame([
      ['x', 'x', 'x'],
      ['x', 'o', 'o'],
      ['o', 'x', 'o']
    ]);
    expect(game.isGameOver()).toBeTruthy();

    game = new HashGame([
      ['x', 'x', 'o'],
      ['o', 'x', 'o'],
      ['o', 'o', 'x']
    ]);
    expect(game.isGameOver()).toBeTruthy();
  });

  test('Should be not success game over.', () => {
    let game = new HashGame([
      ['x', 'o', 'x'],
      ['o', 'x', 'o'],
      ['o', 'x', 'o']
    ]);
    expect(game.isGameOver()).not.toBeTruthy();

    game = new HashGame([
      ['x', 'o', 'o'],
      ['o', 'x', 'x'],
      ['o', 'x', 'o']
    ]);
    expect(game.isGameOver()).not.toBeTruthy();

    game = new HashGame([
      ['o', 'o', 'x'],
      ['o', null, 'o'],
      ['x', 'o', 'o']
    ]);
    expect(game.isGameOver()).not.toBeTruthy();
  });
});
// test game over
