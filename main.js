/*It helped me to build the markup that I wanted using only html and css,
and then program the JS to create an exact replica of my markup.*/
let scriptLoadingText = document.getElementById("script_load_text");
scriptLoadingText.style.display = 'none';
let preGameBody = document.getElementById("pre_game_body");
let gameBodyId = document.getElementById("game_body");
preGameBody.style.display = 'block';
gameBodyId.style.display = 'none';
var timerElement = document.querySelectorAll(".timer_start");
console.log(timerElement);
function startGame(){
  preGameBody.style.display = 'none';
  createGameBoard();
  gameBodyId.style.display = 'block';
}

function createGameBoard(){
  return
}

function playercick(){
  timerBeginCount();
}


function timerBeginCount(){
let timerClassArray = document.getElementsByClassName("timer_start");
console.log(timerClassArray);
for (let i = 0; i < timerElement.length; i++){
  timerClassArray[0].classList.remove('timer_start');
}
let countDownDate = new Date().getTime();
countDownDate = countDownDate + 300000;
  var x = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("clockdiv").innerHTML = minutes + "m " + seconds + "s ";
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("clockdiv").innerHTML = "EXPIRED";
    }
  }, 1000);
};



/*
Addd a listener to all options
if one is clicked, keep it displayed
if two is clicked, compare and see if they match
if they do not match, make them hidden
if they do match, keep them up

while (game running){
code will do this
}
*/
