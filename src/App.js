import React, { Component } from 'react';
import logo from './logo.svg';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ["", "", "", "", "", "", "", "", ""],
      human: "",
      computer: "",
      turn: 1,
      gameIsOn: false,
      clickAllowed: false,
      winner: "",
      disableStartButton: false,
      showChooseLetter: false,
      showDeclareWinner: false
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
    setTimeout( () => {
      if (!this.state.gameIsOn) {
        this.setState({
          disableStartButton: false
        });
      }
    }, 200);
  }

  handleChooseLetter = (e) => {
    let human = e.target.id;
    let computer;
    human === "X" ? computer = "O" : computer = "X"
    this.setState({
      human: human,
      computer: computer,
      gameIsOn: true,
      clickAllowed: true,
      disableStartButton: true
    })
    this.closeChooseLetter();
  }

  handleClick = (e) => {
    console.log("human: " + this.state.turn);
    if (this.state.gameIsOn && this.state.clickAllowed) {
      this.setState({ clickAllowed: false });
      this.updateBoard(e.target.id, this.state.human);
      setTimeout( () => {
        if (this.state.gameIsOn) {
          this.computerMove();
          if (this.state.gameIsOn) {
            this.setState({ clickAllowed: true });
          }
        }
      }, 500);
    }
  }

  updateBoard = (index, player) => {
    let board = this.state.board;
    board[index] = player;
    this.setState({
      board: board
    });
    this.checkWin();
  }

  computerMove = () => {
    console.log("computer: " + this.state.turn)
    let openSpaces = [];
    let chosenSpace;
    this.state.board.forEach((space, i) => {
      if (space === "") openSpaces.push(i);
    });
    chosenSpace = this.computerCanWinHere(openSpaces);
    if (chosenSpace !== null) {
      console.log("chosenSpace to win is " + chosenSpace);
      this.updateBoard(chosenSpace, this.state.computer);
      return;
    }
    chosenSpace = this.computerCanBlockHere(openSpaces);
    if (chosenSpace !== null) {
      console.log("chosenSpace to block is " + chosenSpace);
      this.updateBoard(chosenSpace, this.state.computer);
      return;
    }
    let chosenSpaceIndex = Math.floor(Math.random() * openSpaces.length);
    chosenSpace = openSpaces[chosenSpaceIndex];
    console.log("random chosenSpace is " + chosenSpace);
    this.updateBoard(chosenSpace, this.state.computer);
  }

  //recieves array of indeces of open spaces on state.board
  //return space to play for win
  computerCanWinHere = (openSpaces) => {
    console.log("entered computerCanWinHere(" + openSpaces +")")
    let board = this.state.board;
    for (let i = 0; i < openSpaces.length; i++) {
      board[openSpaces[i]] = this.state.computer;
      if (this.winMovePossible(board)) {
        return openSpaces[i];
      } else {
        board[openSpaces[i]] = "";
      }
    }
    return null;
  }

  //recieves array of indeces of open spaces on state.board
  //return space to play for block
  computerCanBlockHere = (openSpaces) => {
    console.log("entered computerCanBlockHere(" + openSpaces +")")
    let board = this.state.board;
    for (let i = 0; i < openSpaces.length; i++) {
      board[openSpaces[i]] = this.state.human;
      if (this.winMovePossible(board)) {
        return openSpaces[i];
      } else {
        board[openSpaces[i]] = "";
      }
    }
    return null;
  }

  winMovePossible = (board) => {
    console.log("entered winMovePossible(" + board + ")")
    if (board[0] !== "" && board[0] === board[1] && board[0] === board[2]) {
      return true;
    }
    else if (board[3] !== "" && board[3] === board[4] && board[3] === board[5]) {
      return true;
    }
    else if (board[6] !== "" && board[6] === board[7] && board[6] === board[8]) {
      return true;
    }
    else if (board[0] !== "" && board[0] === board[3] && board[0] === board[6]) {
      return true;
    }
    else if (board[1] !== "" && board[1] === board[4] && board[1] === board[7]) {
      return true;
    }
    else if (board[2] !== "" && board[2] === board[5] && board[2] === board[8]) {
      return true;
    }
    else if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
      return true;
    }
    else if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
      return true;
    }
    else {
      return false;
    }
  }

  checkWin = () => {
    console.log("checking win for turn " + this.state.turn);
    if (!this.state.gameIsOn) return;
    if (this.state.turn < 3) {
      this.incrementTurn();
      return;
    }
    let board = this.state.board;

    if (board[0] !== "" && board[0] === board[1] && board[0] === board[2]) {
      this.declareWinner(board[0]);
    }
    else if (board[3] !== "" && board[3] === board[4] && board[3] === board[5]) {
      this.declareWinner(board[3]);
    }
    else if (board[6] !== "" && board[6] === board[7] && board[6] === board[8]) {
      this.declareWinner(board[6]);
    }
    else if (board[0] !== "" && board[0] === board[3] && board[0] === board[6]) {
      this.declareWinner(board[0]);
    }
    else if (board[1] !== "" && board[1] === board[4] && board[1] === board[7]) {
      this.declareWinner(board[1]);
    }
    else if (board[2] !== "" && board[2] === board[5] && board[2] === board[8]) {
      this.declareWinner(board[2]);
    }
    else if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
      this.declareWinner(board[0]);
    }
    else if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
      this.declareWinner(board[2]);
    }
    else if (this.state.turn === 9) {
      this.declareWinner("Nobody");
    }

    this.incrementTurn();
  }

  incrementTurn = () => {
    this.setState({
      turn: this.state.turn + 1
    })
  }

  declareWinner = (winner) => {
    console.log("winner is " + winner);
    this.setState({
      winner: winner,
      gameIsOn: false
    });
    this.openDeclareWinner();
  }

  openDeclareWinner = () => {
    this.setState({
      showDeclareWinner: true
    });
  }

  closeDeclareWinner = () => {
    this.setState({
      showDeclareWinner: false
    });
    this.resetGame();
  }

  resetGame = () => {
    this.setState({
      board: ["", "", "", "", "", "", "", "", ""],
      human: "",
      computer: "",
      turn: 1,
      gameIsOn: false,
      clickAllowed: false,
      winner: ""
    });
    this.openChooseLetter();
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
          //onHide={this.closeChooseLetter}
        >
          <Modal.Header>
            <Modal.Title>Choose Your Letter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="modalBtnContainer">
              <div className="modalBtn"><span id="X" onClick={this.handleChooseLetter}>X</span></div>
              <div className="modalBtn"><span id="O" onClick={this.handleChooseLetter}>O</span></div>
            </div>
          </Modal.Body>
        </Modal>

        <div className="container">
          <Board
            board={this.state.board}
            handleClick={this.handleClick}
            checkWin={this.checkWin}
          />

          <Button
            disabled={this.state.disableStartButton}
            bsStyle="primary"
            bsSize="large"
            onClick={this.openChooseLetter}
          >Start Game</Button>
        </div>

        <Modal
          show={this.state.showDeclareWinner}
          onHide={this.closeDeclareWinner}
          id="declareWinner"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            {this.state.winner} Wins!
          </Modal.Body>
        </Modal>

        <div id="footer">
          <span>Made by <a href="https://colinthornton.github.io">Colin Thornton</a></span>
        </div>
      </div>
    );
  }
}

class Board extends Component {
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
