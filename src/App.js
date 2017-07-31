import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ["", "", "", "", "", "", "", "", ""],
      human: "X",
      computer: "O",
      turn: 0
    }
  }

  handleClick = (e) => {
    this.updateBoard(e.target.id, this.state.human);
    this.computerMove();
  }

  updateBoard = (index, player) => {
    let board = this.state.board;
    board[index] = player;
    this.setState({
      board: board,
      turn: this.state.turn++
    });
  }

  computerMove = () => {
    let openSpaces = [];
    this.state.board.forEach((space, i) => {
      if (space === "") openSpaces.push(i);
    });
    let chosenSpaceIndex = Math.floor(Math.random() * openSpaces.length);
    let chosenSpace = openSpaces[chosenSpaceIndex];
    this.updateBoard(chosenSpace, this.state.computer);
  }

  checkWin = () => {
    if (this.state.turn < 3) return;
    let board = this.state.board;
    if (board[0] !== "" && board[0] === board[1] && board[0] === board[2]) {
      alert(board[0] + " wins!");
    }
    else if (board[3] !== "" && board[3] === board[4] && board[3] === board[5]) {
      alert(board[3] + " wins!");
    }
    else if (board[6] !== "" && board[6] === board[7] && board[6] === board[8]) {
      alert(board[6] + " wins!");
    }
    else if (board[0] !== "" && board[0] === board[3] && board[0] === board[6]) {
      alert(board[0] + " wins!");
    }
    else if (board[1] !== "" && board[1] === board[4] && board[1] === board[7]) {
      alert(board[1] + " wins!");
    }
    else if (board[2] !== "" && board[2] === board[5] && board[2] === board[8]) {
      alert(board[2] + " wins!");
    }
    else if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
      alert(board[0] + " wins!");
    }
    else if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
      alert(board[2] + " wins!");
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Ticky Tacky Toe</h2>
        </div>
        <Board  board={this.state.board}
                handleClick={this.handleClick}
                checkWin={this.checkWin} />
      </div>
    );
  }
}

class Board extends Component {
  componentDidUpdate() {
    this.props.checkWin();
  }
  render() {
    return (
      <div id="board">
        <div className="gameBtn" id="0" onClick={this.props.handleClick}>
          {this.props.board[0]}</div>
        <div className="gameBtn" id="1" onClick={this.props.handleClick}>
          {this.props.board[1]}</div>
        <div className="gameBtn" id="2" onClick={this.props.handleClick}>
          {this.props.board[2]}</div>
        <div className="gameBtn" id="3" onClick={this.props.handleClick}>
          {this.props.board[3]}</div>
        <div className="gameBtn" id="4" onClick={this.props.handleClick}>
          {this.props.board[4]}</div>
        <div className="gameBtn" id="5" onClick={this.props.handleClick}>
          {this.props.board[5]}</div>
        <div className="gameBtn" id="6" onClick={this.props.handleClick}>
          {this.props.board[6]}</div>
        <div className="gameBtn" id="7" onClick={this.props.handleClick}>
          {this.props.board[7]}</div>
        <div className="gameBtn" id="8" onClick={this.props.handleClick}>
          {this.props.board[8]}</div>
      </div>
    )
  }
}

export default App;
