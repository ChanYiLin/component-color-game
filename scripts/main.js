window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");

var modes = document.querySelectorAll(".mode");
var mode = document.querySelector(".selected");
var countdownNum = document.getElementById("countdown");
var timer = 5;
var countdownTaskId;
var blinkId;


var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");


function init() {
    initMode();
    initCards();
    reset();
}

function initMode(){
    for (let i = 0; i < modes.length; i++){
        modes[i].addEventListener("click", function(){
            for(let j = 0; j < modes.length; j++){
                modes[j].classList.remove('selected');
            }
            this.classList.add('selected');
            mode = this.textContent;
            console.log(mode);
            if(mode === "Easy"){
                console.log("I am here!");
                numCards = 3;
            }else{
                numCards = 6;
            }
            reset();
        });
    }    
}


function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            // compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                end();
            } else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again!"
            }
        });
    }
}


/*
reset:
1. clear all the interval task.
2. gameOver = false.
3. regenerate the color of the cards and the pickedColor.
4. set the background color to default color.
5. if it is in the nightmare mode now, reset the countdown task.
*/

function reset() {
    clearInterval(countdownTaskId);
    clearInterval(blinkId);
    resetButton.style.opacity = 1;
    timer = 5;
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
    //nightmare:
    //1. no resetButton when countdown.
    //2. countdown from 5
    //3. blink every one second.
    if(mode === "Nightmare"){
        resetButton.style.opacity = 0;
        countdownNum.innerHTML = '&nbsp;&nbsp' + timer;  // countdown from the timer.
        countdownTaskId = setInterval(countdown, 1000);  // hadle the countdown and the blink every 1 sec.
    }else{
        countdownNum.innerHTML = ''
    }
}

resetButton.addEventListener("click", function() {
    reset();
})


/*
countdown should be just a call back function.
1. put the blink interval task to the task queue. After the countdown, it will be executed
2. if the timer equals to 0, then gameover.
3. if player choose the right card, then gameover.
4. countdownNum - 1
*/

function countdown(){
    console.log(timer);
    countdownNum.innerHTML = '&nbsp;&nbsp;' + (--timer);
    body.style.backgroundColor = '#FFF';
    blinkId = setInterval(function(){
        body.style.backgroundColor = '#232323';
        clearInterval(blinkId);
        console.log('in side the callback function of blink');
    }, 50);
    //we shouldn't put any task related to the correct event here.
    /*if(gameOver === true){ 
        resetButton.style.opacity = 1;
        body.style.backgroundColor = pickedColor; 
        console.log('finish all the task when correct!');
        return;
    }*/
    // gameover clear all the interval task.
    if(timer === 0){       
        clearInterval(countdownTaskId);
        clearInterval(blinkId);
        
        messageDisplay.textContent = "Time Out!";
        end();

        console.log('finish all the task when timeout!');
        return;
    }
    console.log('finish all the task in the countdown timeinterval');

}

/*
function end(){}
1. gameover
2. countdownNum.style.display = "none";
3. resetButton shows up and ask player wether to play again.
4. all the cards turn white.
5. the background changes to the pickedColor
*/

function end(){
    // clear the interval task right after timeout and correct.
    clearInterval(countdownTaskId);
    clearInterval(blinkId);
    gameOver = true;
    countdownNum.textContent = '';
    resetButton.style.opacity = 1;
    resetDisplay.textContent = "Play Again";
    changeColors("#FFF");
    body.style.backgroundColor = pickedColor;
}



function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
