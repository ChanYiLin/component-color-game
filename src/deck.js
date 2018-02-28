import Component from './component.js';
import Card from './card.js';

import './deck.css';

/*
 * [Event name: params]
 * wrongClick: this
 * rightClick: this, pickedColor
 */
export default class Deck extends Component {
    static getRootClass() {
        return '.deck';
    }

    constructor(root) {
        super(root);

        this.gameOver = false;
        this.cards = [];
        this.realCards = [];
        const els = root.querySelectorAll(Card.getRootClass());
        for (let el of els) {
            const card = new Card(el);
            card.on('click', this.handleCardClick.bind(this));
            this.cards.push(card);
        }
        this.realCards = this.cards;
        this.pickedColor = this.pickColor();
    }

    handleModeChange(numCards){
        this.realCards = this.cards.slice(0, numCards);
    }

    reset() {
        this.gameOver = false;
        console.log(this.realCards);

        for(let card of this.cards){
            card.notShow();
        }

        for (let card of this.realCards){
            card.reset();
        }

        this.pickedColor = this.pickColor();
    }

    getPickedColor() {
        return this.pickedColor;
    }

    handleCardClick(firer, color) {
        if (this.gameOver)
            return;

        if (color === this.pickedColor) {
            this.turnCardsToWhite();
            this.gameOver = true;
            this.fire('rightClick', this.pickedColor);
        } else {
            firer.fadeOut();
            this.fire('wrongClick');
        }
    }

    turnCardsToWhite(){
        for (let card of this.realCards)
            card.fadeIn("#FFF");
    }

    pickColor() {
        const random = Math.floor(Math.random() * this.realCards.length);
        return this.realCards[random].getColor();
    }
}
