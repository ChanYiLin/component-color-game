import Component from  './component.js';

import './board.css';

/*
 * [Event name: params]
 * click: this, color
 */
export default class Board extends Component {
    static getRootClass() {
        return '.board';
    }

    constructor(root, color) {
        super(root);

        this.mode = 'Hard';
        
        this.colorDisplay = root.querySelector('.color-picked');
        this.messageDisplay = root.querySelector('.message');
        this.timer = root.querySelector('.countdown');
        this.time = 5;
        this.reset(color);
    }

    reset(color, mode) {

        this.mode = mode;
        this.time = 5;
        this.colorDisplay.textContent = color;
        this.messageDisplay.textContent = "What's the Color?";
        
        if(mode === 'Nightmare'){
            this.timer.innerHTML = '&nbsp;&nbsp' + this.time;
            this.countdownTaskId = setInterval(this.countdown.bind(this), 1000);
        }else{
            this.timer.innerHTML = '';
        }
    }


    countdown(){

        this.timer.innerHTML = '&nbsp;&nbsp;' + (--this.time);
        this.fire('blink');
        //body.style.backgroundColor = '#FFF';
        //blinkId = setInterval(function(){
        //    body.style.backgroundColor = '#232323';
        //    clearInterval(blinkId);
        //    
        //}, 50);
        // gameover clear all the interval task.
        if(this.time === 0){       
            //clearInterval(this.countdownTaskId);
            //clearInterval(blinkId);
            
            this.messageDisplay.textContent = "Time Out!";
            this.timeOut();

            //console.log('finish all the task when timeout!');
            //return;
        }
        //console.log('finish all the task in the countdown timeinterval');

    }

    timeOut(){
        clearInterval(this.countdownTaskId);

        this.timer.innerHTML = '';

        this.fire('timeOut');
    }

    showColor(color) {
        this.colorDisplay.textContent = color;
    }

    showCorrectMessage() {
        this.messageDisplay.textContent = "Correct!";
    }

    showWrongMessage() {
        this.messageDisplay.textContent = "Try Again";
    }
}
