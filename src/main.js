import Component from  './component.js';
import Navbar from  './navbar.js';
import Board from  './board.js';
import Deck from  './deck.js';
import Reset from  './reset.js';

import './main.css';

export default class Main extends Component {
    static getRootClass() {
        return '.main';
    }

    constructor(root) {
        super(root);

        this.cardNum = 6;
        this.mode = 'Hard';

        this.navbar = new Navbar(root.querySelector('.navbar'));
        this.navbar.on('changeMode', this.handleModeChange.bind(this));

        this.deck = new Deck(root.querySelector('.deck'));
        this.deck.on('wrongClick', this.handleDeckWrongClick.bind(this));
        this.deck.on('rightClick', this.handleDeckRightClick.bind(this));

        this.board = new Board(root.querySelector('.board'), this.deck.getPickedColor());
        this.board.on('blink', this.handleBlink.bind(this));
        this.board.on('timeOut', this.handleTimeOut.bind(this));


        this.reset = new Reset(root.querySelector('.reset'));
        this.reset.on('click', this.handleRestClick.bind(this));
    }

    handleTimeOut(){
        clearInterval(this.blinkId);
        this.deck.gameOver = true;
        this.deck.turnCardsToWhite();
        this.reset.showPlayAgain();
        this.root.style.backgroundColor = this.deck.pickedColor;

    }

    handleBlink(){

        this.root.style.backgroundColor = '#FFF'; //this.root = body
        // use arrow function to set the 'this' object in the callback function
        // to the current 'this' object or it will be Windows.
        this.blinkId = setInterval( () => { 
            this.root.style.backgroundColor = '#232323';
            clearInterval(this.blinkId);
        }, 50);
    }

    handleModeChange(firer, selectedMode){
        this.mode = selectedMode;
        if(this.mode === 'Easy'){
            this.numCards = 3;
        }else{
            this.numCards = 6;
        }

        this.deck.handleModeChange(this.numCards);

        this.handleRestClick();
    }

    handleDeckWrongClick(firer) {
        this.board.showWrongMessage();
    }

    handleDeckRightClick(firer, pickedColor) {
        clearInterval(this.board.countdownTaskId);
        clearInterval(this.blinkId);
        this.board.timer.innerHTML = '';
        this.root.style.backgroundColor = pickedColor;
        this.board.showCorrectMessage();
        this.reset.showPlayAgain();
    }

    handleRestClick() {
        clearInterval(this.board.countdownTaskId);
        clearInterval(this.blinkId);
        this.root.style.backgroundColor = "#232323";
        this.deck.reset();

        this.board.reset(this.deck.getPickedColor(), this.mode);
        this.reset.reset(this.mode);
    }

}

window.onload = function() {
    const body = document.querySelector('body');
    new Main(body);
};
