import React, { Component } from 'react';
import logo from './logo.svg';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ["", "", "", "", "", "", "", "", ""],
      human: "X",
      computer: "O",
      turn: 0,
      gameIsOn: false,
      showChooseLetter: false
    }
  }

  openChooseLetter = () => {
    this.setState({
      showChooseLetter: true
    });
  }

  closeChooseLetter = () => {
    this.setState({
      showChooseLetter: false
    });
  }

  handleChooseLetter = (e) => {
    let human = e.target.id;
    let computer;
    human === "X" ? computer = "O" : computer = "X"
    this.setState({
      human: human,
      computer: computer,
      gameIsOn: true,
    })
    this.closeChooseLetter();
  }

  handleClick = (e) => {
    if (this.state.gameIsOn) {
      this.updateBoard(e.target.id, this.state.human);
      this.checkWin();
      if (this.state.gameIsOn) {
        this.computerMove();
        this.checkWin();
      }       
    }
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
    else if (this.state.turn === 9) {
      alert("No Contest");
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Ticky Tacky Toe</h2>
        </div>
        <Modal
          show={this.state.showChooseLetter}
          onHide={this.closeChooseLetter}
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose Your Letter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="modalBtnContainer">
              <div className="modalBtn"><span id="X" onClick={this.handleChooseLetter}>X</span></div>
              <div className="modalBtn"><span id="O" onClick={this.handleChooseLetter}>O</span></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeChooseLetter}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Board
          board={this.state.board}
          handleClick={this.handleClick}
          checkWin={this.checkWin}
        />
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.openChooseLetter}
        >Start Game</Button>
      </div>
    );
  }
}

class Board extends Component {
  componentDidUpdate() {

  }

  render() {
    let buttons = [];
    for (let i = 0; i < 9; i++) {
      buttons.push(
        <div className="gameBtn"><span id={String(i)} onClick={this.props.handleClick}>{this.props.board[i]}</span></div>
      )
    }
    return (
      <div id="board">
        {buttons}
      </div>
    )
  }
}

export default App;
